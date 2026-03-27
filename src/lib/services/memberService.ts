import bcrypt from 'bcrypt';
import { memberRepository } from '@/lib/repositories/memberRepository';
import { type Member, type NewMember, memberships  } from '@/db/schema';
import type { MemberRole, MemberStatus } from '@/types';
import type { MemberWithMemberships as RawMemberWithMemberships } from '@/lib/repositories/memberRepository';
import type { InferSelectModel } from 'drizzle-orm';
import { membershipRepository } from '@/lib/repositories/membershipRepository'

type Membership = InferSelectModel<typeof memberships>;

export type MembershipWithStatus = Membership & {
  status: 'active' | 'expired' | 'expiring_soon';
};

export type MemberWithMemberships = Omit<RawMemberWithMemberships,'memberships'> & {
  memberships: MembershipWithStatus[];
};



function getMembershipStatus(endDate: string): 'active' | 'expired' | 'expiring_soon' {
  const today = new Date();
  const end = new Date(endDate);

  const diffTime = end.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return 'expired';
  if (diffDays <= 30) return 'expiring_soon';
  return 'active';
}

export class MemberService {
  private readonly SALT_ROUNDS = 12;

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.SALT_ROUNDS);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Failed to hash password');
    }
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Error verifying password:', error);
      throw new Error('Failed to verify password');
    }
  }

  async authenticateMember(email: string, password: string): Promise<Member | null> {
    try {
      console.log(`Authentication attempt for email: ${email}`);

      const member = await memberRepository.getMemberByEmail(email);

      if (!member) {
        console.log('Authentication failed: member not found');
        return null;
      }

      const isValidPassword = await this.verifyPassword(password, member.passwordHash);

      if (!isValidPassword) {
        console.log('Authentication failed: invalid password');
        return null;
      }

      console.log(`Authentication successful for member: ${member.id}`);
      return member;
    } catch (error) {
      console.error('Error during member authentication:', error);
      return null;
    }
  }

  async createMemberWithPassword(
    data: Omit<NewMember, 'id' | 'createdAt' | 'updatedAt' | 'passwordHash'> & { password: string }
  ): Promise<Member> {
    try {
      const passwordHash = await this.hashPassword(data.password);

      const memberData = {
        ...data,
        passwordHash
      };

      const member = await memberRepository.createMember(memberData);

      console.log(`Member created successfully: ${member.id}`);
      return member;
    } catch (error: unknown) {
      console.error('Error creating member with password:', error);

      if (error instanceof Error && error.message === 'Email already exists') {
        throw error;
      }

      // if (error.message === 'Email already exists') {
      //   throw error;
      // }

      throw new Error('Failed to create member');
    }
  }

  // async getMemberByEmail(email: string): Promise<MemberWithMemberships | null> {
  //   return memberRepository.getMemberByEmail(email);
  // }

  async getMemberByEmail(email: string): Promise<MemberWithMemberships | null> {
    const member = await memberRepository.getMemberByEmail(email);

    if (!member) return null;

    const membershipsWithStatus = member.memberships.map((membership) => ({
      ...membership,
      status: getMembershipStatus(membership.endDate),
    }));

    return {
      ...member,
      memberships: membershipsWithStatus,
    };
  }

  async getMemberById(id: string): Promise<Member | null> {
    return memberRepository.getMemberById(id);
  }

  async listMembers(options?: {
    status?: MemberStatus;
    role?: MemberRole;
    limit?: number;
    offset?: number;
  }): Promise<{ members: Member[]; total: number }> {
    return memberRepository.listMembers(options);
  }

  async getAllMembersWithStatus() {
    const members = await memberRepository.getAllMembersWithMemberships()

    return members.map(member => ({
      ...member,
      memberships: member.memberships.map(membership => ({
        ...membership,
        status: getMembershipStatus(membership.endDate)
      }))
    }))
  }

  async renewMembership(memberId: string, type: 'yearly' | 'semester') {

    const latest = await membershipRepository.getLatestMembership(memberId)

    const startDate = latest
      ? new Date(`${latest.endDate}T00:00:00`)
      : new Date()

    const endDate = new Date(startDate)

    if (type === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1)
    }

    if (type === 'semester') {
      endDate.setMonth(endDate.getMonth() + 6)
    }

    const amount = type === 'yearly' ? '70' : '36'

    const startDateStr = startDate.toISOString().split('T')[0]
    const endDateStr = endDate.toISOString().split('T')[0]

    return membershipRepository.createMembership({
      memberId,
      startDate: startDateStr,
      endDate: endDateStr,
      type,
      amount
    })
  }

  async getMemberWithMemberships(memberId: string) {
    const member = await memberRepository.getMemberWithMemberships(memberId)

    if (!member) return null

    const today = new Date()

    const memberships = member.memberships.map((membership) => {
      const start = new Date(membership.startDate)
      const end = new Date(membership.endDate)

      let status: "active" | "expired" | "upcoming"

      if (today < start) {
        status = "upcoming"
      } else if (today > end) {
        status = "expired"
      } else {
        status = "active"
      }

      return {
        ...membership,
        status
      }
    })

    return {
      ...member,
      memberships
    }
  }

  async searchMembers(search: string, status: string, page: number, pageSize: number) {
    return memberRepository.searchMembers(search, status, page, pageSize)
  }

  async getAllMembers(){
    return memberRepository.getAllMembers()
  }

  async getPaginatedMembers(page: number, limit: number){
    return memberRepository.getPaginatedMembers(page, limit)
  }

  // async searchMembersPaginated(
  //   search: string,
  //   status: string,
  //   page: number,
  //   pageSize: number
  // ) {
  //   const allMembers = await this.searchMembers(search, status, page, pageSize)

  //   const total = allMembers.length

  //   const paginated = allMembers.slice(
  //     (page - 1) * pageSize,
  //     page * pageSize
  //   )

  //   return {
  //     data: paginated,
  //     total,
  //     totalPages: Math.ceil(total / pageSize),
  //   }
  // }

}

export const memberService = new MemberService();