import { requireAdmin } from '@/lib/auth'
import { memberService } from '@/lib/services/memberService'
import Link from 'next/link'

export default async function AdminApplicationsPage() {
  await requireAdmin()

  const members = await memberService.getAllMembers()

  const pendingApplications = members.filter(
    member => member.status === 'pending'
  )

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">
        Pending Applications
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Submitted</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pendingApplications.map((member) => (
            <tr key={member.id} className="border-t">
              <td className="p-3">{member.name}</td>

              <td className="p-3">{member.email}</td>

              <td className="p-3">
                {member.paymentStatus}
              </td>

              <td className="p-3">
                {new Date(member.createdAt).toLocaleDateString('pt-PT')}
              </td>

              <td className="p-3">
                <Link
                  href={`/admin/applications/${member.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Review Application
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}