import { db } from "@/db"
import { members, memberships } from "@/db/schema"
import { count, lt, gt } from "drizzle-orm"

export const adminDashboardService = {
  async getStats() {
    const today = new Date().toISOString().split("T")[0]

    const totalMembers = await db
      .select({ value: count() })
      .from(members)

    const activeMemberships = await db
      .select({ value: count() })
      .from(memberships)
      .where(gt(memberships.endDate, today))

    const expiredMemberships = await db
      .select({ value: count() })
      .from(memberships)
      .where(lt(memberships.endDate, today))

    const recentRenewals = await db
      .select()
      .from(memberships)
      .orderBy(memberships.createdAt)
      .limit(5)

    return {
      totalMembers: totalMembers[0].value,
      activeMemberships: activeMemberships[0].value,
      expiredMemberships: expiredMemberships[0].value,
      recentRenewals
    }
  }
}