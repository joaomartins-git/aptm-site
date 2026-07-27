import { eq, and, count, InferSelectModel, ilike, or } from 'drizzle-orm';
import { db } from '@/db';
import { members, memberships, type Member, type NewMember } from '@/db/schema';
import type { MemberRole, MemberStatus } from '@/types';
import type { CompleteProfileData } from '@/types/memberComplete'

export type MemberWithMemberships =
  InferSelectModel<typeof members> & {
    memberships: InferSelectModel<typeof memberships>[]
  }

export class MemberRepository {
  async getMemberByEmail(email: string): Promise<MemberWithMemberships  | null> {
    try {
      const result = await db.query.members.findFirst({
        where: (members, { eq }) => eq(members.email, email),
        with: {
          memberships: {
            orderBy: (memberships, { desc }) => [desc(memberships.startDate)],
          },
        },
      });

      return result ?? null;
    } catch (error) {
      console.error('Error fetching member by email:', error);
      throw new Error('Failed to fetch member by email');
    }
  }

  async getMemberById(id: string): Promise<Member | null> {
    try {
      const result = await db
        .select()
        .from(members)
        .where(eq(members.id, id))
        .limit(1);

      return result[0] || null;
    } catch (error) {
      console.error('Error fetching member by ID:', error);
      throw new Error('Failed to fetch member by ID');
    }
  }

  async createMember(data: Omit<NewMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<Member> {
    try {
      const result = await db
        .insert(members)
        .values(data)
        .returning();

      return result[0];
    } catch (error: unknown) {
      console.error('Error creating member:', error);

      if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === '23505'){
        throw new Error('Email already exists');
      }

      throw new Error('Failed to create member');
    }
  }

  async listMembers(options?: {
    status?: MemberStatus;
    role?: MemberRole;
    limit?: number;
    offset?: number;
  }): Promise<{ members: Member[]; total: number }> {
    try {
      const { status, role, limit = 50, offset = 0 } = options || {};

      const conditions = [];
      if (status) {
        conditions.push(eq(members.status, status));
      }
      if (role) {
        conditions.push(eq(members.role, role));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      const [memberList, totalCount] = await Promise.all([
        db
          .select()
          .from(members)
          .where(whereClause)
          .limit(limit)
          .offset(offset)
          .orderBy(members.createdAt),

        db
          .select({ count: count() })
          .from(members)
          .where(whereClause)
      ]);

      return {
        members: memberList,
        total: totalCount[0]?.count || 0
      };
    } catch (error) {
      console.error('Error listing members:', error);
      throw new Error('Failed to list members');
    }
  }

  async getAllMembersWithMemberships(): Promise<MemberWithMemberships[]> {
    try {
      const result = await db.query.members.findMany({
        with: {
          memberships: {
            orderBy: (memberships, { desc }) => [desc(memberships.startDate)],
          },
        },
        orderBy: (members, { asc }) => [asc(members.name)],
      });

      return result;
    } catch (error) {
      console.error('Error fetching all members with memberships:', error);
      throw new Error('Failed to fetch members');
    }
  }

  async getMemberWithMemberships(memberId: string) {
    return db.query.members.findFirst({
      where: (members, { eq }) => eq(members.id, memberId),
      with: {
        memberships: true
      }
    })
  }

  async searchMembers(
    search: string,
    status: string,
    page: number,
    pageSize: number
  ) {
    const members = await db.query.members.findMany({
      with: {
        memberships: true
      }
    })

    let filtered = members

    // SEARCH FILTER
    if (search) {
      const searchLower = search.toLowerCase()
      

      filtered = filtered.filter(member => {
        const email = member.email?.toLowerCase() ?? ""

        return(
          member.name.toLowerCase().includes(searchLower) ||
          email.includes(searchLower)
        )
      })
    }

    // STATUS FILTER
    if (status !== "all") {
      const today = new Date()

      filtered = filtered.filter(member => {
        const membership = member.memberships[0]
        if (!membership) return false

        const endDate = new Date(membership.endDate)

        const diffDays = Math.ceil(
          (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        )

        let membershipStatus: "active" | "expired" | "expiring_soon"

        if (diffDays < 0) membershipStatus = "expired"
        else if (diffDays <= 30) membershipStatus = "expiring_soon"
        else membershipStatus = "active"

        return membershipStatus === status
      })
    }

    const total = filtered.length

    const paginated = filtered.slice(
      (page - 1) * pageSize,
      page * pageSize
    )

    return {
      data: paginated,
      total: total,
      totalPages: Math.ceil(total / pageSize)
    }
  }

  async getAllMembers(){
    return db.query.members.findMany({
      with: {
        memberships: true
      }
    })
  }

  async getPaginatedMembers(page: number, limit: number){
    const offset = (page - 1) * limit

    return db.query.members.findMany({
      limit,
      offset,
      with: {
        memberships: true
      }
    })
  }

  async updateMemberStatus(
    memberId: string,
    status: MemberStatus
  ) {
    const [updatedMember] = await db
      .update(members)
      .set({
        status,
        updatedAt: new Date()
      })
      .where(eq(members.id, memberId))
      .returning()

    return updatedMember
  }

async findImportedMember(
  memberNumber: number,
  name: string
): Promise<Member | null> {
  const [member] = await db
    .select()
    .from(members)
    .where(
      and(
        eq(members.memberNumber, memberNumber),
        eq(members.name, name),
        eq(members.status, "imported")
      )
    )
    .limit(1)

  return member ?? null
}

async activateImportedMember(
  memberId: string,
  email: string,
  passwordHash: string
) {
  const [member] = await db
    .update(members)
    .set({
      email,
      passwordHash,
      status: "active",
      profileCompleted: false,
      updatedAt: new Date()
    })
    .where(eq(members.id, memberId))
    .returning()

  return member
}

async emailExists(email: string) {
  const member = await db.query.members.findFirst({
    where: (member, { eq }) => eq(member.email, email)
  })

  return !!member
}

async getPublicTherapists() {
  return db.query.members.findMany({
    where: (member, { and, eq }) =>
      and(
        eq(member.status, "active"),
        eq(member.isPublicTherapist, true)
      )
  })
}

async findByMemberNumber(memberNumber: number): Promise<Member | null> {
  try {
    const result = await db
      .select()
      .from(members)
      .where(eq(members.memberNumber, memberNumber))
      .limit(1)

    return result[0] ?? null

  } catch (error) {
    console.error('Error fetching member by member number:', error)
    throw new Error('Failed to fetch member')
  }
}


async completeProfile( memberId: string, data: CompleteProfileData){
  await db
  .update(members)
  .set({
      birthDate: data.birthDate,
      phone: data.phone,
      address: data.address,
      nif: data.nif,
      profession: data.profession,
      institution: data.institution,
      district: data.district,
      professionalLicenseNumber: data.professionalLicenseNumber,
      specialties: data.specialties,
      habilitacoes: data.habilitacoes,
      profilePhotoUrl: data.profilePhotoUrl,
      professionalCardUrl: data.professionalCardUrl,
      certificatesUrls: data.certificatesUrls,
      profileCompleted: true,
      updatedAt: new Date()
  })
  .where(eq(members.id, memberId))
}


}

export const memberRepository = new MemberRepository();