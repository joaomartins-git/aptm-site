import { db } from '@/db'
import { memberships } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export class MembershipRepository {

  async getLatestMembership(memberId: string) {
    const result = await db.query.memberships.findFirst({
      where: (m, { eq }) => eq(m.memberId, memberId),
      orderBy: (m, { desc }) => [desc(m.endDate)]
    })

    return result ?? null
  }

  async createMembership(data: {
    memberId: string
    startDate: string
    endDate: string
    type: 'yearly' | 'semester'
    amount: string
  }) {

    const result = await db
       .insert(memberships)
       .values(data)
       .returning()

    return result[0]
  }

}

export const membershipRepository = new MembershipRepository()