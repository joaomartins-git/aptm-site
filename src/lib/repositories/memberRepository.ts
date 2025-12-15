import { eq, and, count } from 'drizzle-orm';
import { db } from '@/db';
import { members, type Member, type NewMember } from '@/db/schema';

export class MemberRepository {
  async getMemberByEmail(email: string): Promise<Member | null> {
    try {
      const result = await db
        .select()
        .from(members)
        .where(eq(members.email, email))
        .limit(1);

      return result[0] || null;
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
    } catch (error: any) {
      console.error('Error creating member:', error);

      if (error.code === '23505') {
        throw new Error('Email already exists');
      }

      throw new Error('Failed to create member');
    }
  }

  async listMembers(options?: {
    status?: string;
    role?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ members: Member[]; total: number }> {
    try {
      const { status, role, limit = 50, offset = 0 } = options || {};

      const conditions = [];
      if (status) {
        conditions.push(eq(members.status, status as any));
      }
      if (role) {
        conditions.push(eq(members.role, role as any));
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
}

export const memberRepository = new MemberRepository();