import { requireAdmin } from "@/lib/auth"
import { adminDashboardService } from "@/lib/services/adminDashboardService"

export default async function AdminDashboard() {
  await requireAdmin()

  const stats = await adminDashboardService.getStats()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="border p-6 rounded">
          <h2 className="text-sm text-gray-500">
            Total Members
          </h2>
          <p className="text-3xl font-bold">
            {stats.totalMembers}
          </p>
        </div>

        <div className="border p-6 rounded">
          <h2 className="text-sm text-gray-500">
            Active Memberships
          </h2>
          <p className="text-3xl font-bold">
            {stats.activeMemberships}
          </p>
        </div>

        <div className="border p-6 rounded">
          <h2 className="text-sm text-gray-500">
            Expired Memberships
          </h2>
          <p className="text-3xl font-bold">
            {stats.expiredMemberships}
          </p>
        </div>
        <h2 className="text-xl font-semibold mt-10">
          Recent Renewals
        </h2>

        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Member ID</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Start</th>
              <th className="p-2 text-left">End</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentRenewals.map((renewal) => (
              <tr key={renewal.id} className="border-t">
                <td className="p-2">{renewal.memberId}</td>
                <td className="p-2">{renewal.type}</td>
                <td className="p-2">{renewal.startDate}</td>
                <td className="p-2">{renewal.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}