import { eq, and, count, InferSelectModel } from 'drizzle-orm';
import { db } from '@/db';
import { members, memberships, type Member, type NewMember } from '@/db/schema';
import type { MemberRole, MemberStatus } from '@/types';

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


}

export const memberRepository = new MemberRepository();