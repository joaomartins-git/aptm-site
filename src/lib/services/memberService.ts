import bcrypt from 'bcrypt';
import { memberRepository } from '@/lib/repositories/memberRepository';
import { type Member, type NewMember, memberships  } from '@/db/schema';
import type { MemberRole, MemberStatus } from '@/types';
import type { MemberWithMemberships as RawMemberWithMemberships } from '@/lib/repositories/memberRepository';
import type { InferSelectModel } from 'drizzle-orm';
import { membershipRepository } from '@/lib/repositories/membershipRepository'
import type { CompleteProfileData } from '@/types/memberComplete'

type Membership = InferSelectModel<typeof memberships>;

export type MembershipWithStatus = Membership & {
  status: 'active' | 'expired' | 'expiring_soon' | 'pending';
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

      // New Check for active members
      if (member.status !== "active") {
          console.log("Authentication failed: member is not active")
          return null
      }

      // NEW CHECK for the password
      if (!member.passwordHash) {
        console.log('Authentication failed: no password set');
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

  async approveMember(memberId: string) {
    return memberRepository.updateMemberStatus(
      memberId,
      'active'
    )
  }

  async rejectMember(memberId: string) {
    return memberRepository.updateMemberStatus(
      memberId,
      'rejected'
    )
  }

  async activateImportedMember(data: {
  memberNumber: number
  name: string
  email: string
  password: string
}): Promise<Member> {

  // Normalize inputs
  const normalizedName = data.name
    .trim()
    .replace(/\s+/g, " ")

  const normalizedEmail = data.email
    .trim()
    .toLowerCase()

  const normalizedPassword = data.password.trim()

  //const { memberNumber, name, email, password } = data

  // 1 - Find imported member
  const member = await memberRepository.findImportedMember(
    data.memberNumber,
    normalizedName
  )

  if (!member) {
    throw new Error("Não foi encontrado nenhum sócio por ativar com os dados fornecidos.")
  }

  // 2 - Check status
  if (member.status !== "imported") {
    throw new Error("Esta conta já foi ativada.")
  }

  // 3 - Safety check
  if (member.email) {
    throw new Error("Esta conta já possui um email associado.")
  }

  // 4 - Email already exists?
  const emailAlreadyExists = await memberRepository.emailExists(normalizedEmail)

  if (emailAlreadyExists) {
    throw new Error("Este email já está a ser utilizado.")
  }

  // 5 - Hash password
  const passwordHash = await this.hashPassword(normalizedPassword)

  // 6 - Activate account
  const activatedMember =
    await memberRepository.activateImportedMember(
      member.id,
      normalizedEmail,
      passwordHash
    )

  if (!activatedMember) {
    throw new Error("Não foi possível ativar a conta.")
  }

  return activatedMember
}

async getMemberByMemberNumber(memberNumber: number) {
  return memberRepository.findByMemberNumber(memberNumber)
}

async completeProfile(memberId: string, data: CompleteProfileData){
  const member =
    await memberRepository.getMemberById(memberId)

  if (!member) {
    throw new Error(
      'Sócio não encontrado'
    )
  }

  await memberRepository.completeProfile(
    member.id,
    data
  )
}



}

export const memberService = new MemberService();