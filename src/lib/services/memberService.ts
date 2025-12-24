import bcrypt from 'bcrypt';
import { memberRepository } from '@/lib/repositories/memberRepository';
import { type Member, type NewMember } from '@/db/schema';
import type { MemberRole, MemberStatus } from '@/types';

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

  async getMemberByEmail(email: string): Promise<Member | null> {
    return memberRepository.getMemberByEmail(email);
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
}

export const memberService = new MemberService();