import { requireAdmin } from '@/lib/auth'
import { memberService } from '@/lib/services/memberService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

function getStatusBadge(status: 'active' | 'expired' | 'expiring_soon') {
  switch (status) {
    case 'active':
      return { label: 'Ativo', className: 'bg-green-100 text-green-800' }
    case 'expiring_soon':
      return { label: 'Expira em breve', className: 'bg-yellow-100 text-yellow-800' }
    case 'expired':
      return { label: 'Expirado', className: 'bg-red-100 text-red-800' }
  }
}

function calculateMembershipStatus(endDate: string) {
  const today = new Date()
  const end = new Date(endDate)

  const diffDays = Math.ceil(
    (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays < 0) return 'expired'
  if (diffDays <= 30) return 'expiring_soon'
  return 'active'
}

export default async function AdminMembersPage({
  searchParams
}: {
  searchParams: Promise<{ search?: string, status?: string, page?: string}>
}) {
  await requireAdmin()

  const params = await searchParams

  const search = params.search ?? ""
  const status = params.status ?? "all"
  
  const page = Number(params.page ?? 1)
  const pageSize = 10
  const {data: members, totalPages} = await memberService.searchMembers(search, status, page, pageSize)

  return (
    <div className="container mx-auto px-6 py-20">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Sócios</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <form className="mb-6 flex gap-2">
              <input
                name="search"
                defaultValue={search}
                placeholder="Search members..."
                className="border p-2 rounded w-80"
              />

              <select
                name="status"
                defaultValue={status}
                className="border p-2 rounded"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="expiring_soon">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>

              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </form>
            <div className="mb-4">
              <a
                href="/api/admin/members/export"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Export Members CSV
              </a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Nome</th>
                  <th className="text-left py-3">Email</th>
                  <th className="text-left py-3">Função</th>
                  <th className="text-left py-3">Estado da Quota</th>
                  <th className="text-left py-3">Validade</th>
                  <th className="text-left py-3">Ações</th>
                </tr>
              </thead>

              <tbody>
                {members.map(member => {
                  const membership = member.memberships[0]
                  const status = membership
                    ? calculateMembershipStatus(membership.endDate)
                    : null

                  const badge = status ? getStatusBadge(status) : null

                  return (
                    <tr key={member.id} className="border-b">
                      <td className="py-3 font-medium">{member.name}</td>

                      <td className="py-3">{member.email}</td>

                      <td className="py-3 capitalize">{member.role}</td>

                      <td className="py-3">
                        {badge && (
                          <Badge className={badge.className}>
                            {badge.label}
                          </Badge>
                        )}
                      </td>

                      <td className="py-3">
                        {membership
                          ? new Date(membership.endDate).toLocaleDateString('pt-PT')
                          : '—'}
                      </td>
                      <td className="py-3">
                        <Link
                            href={`/admin/members/${member.id}`}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Ver Perfil
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="flex gap-2 mt-4">
              <Link href={`?page=${page - 1}`} className="px-3 py-1 border">
                Previous
              </Link>

              <Link href={`?page=${page + 1}`} className="px-3 py-1 border">
                Next
              </Link>
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages || 1 }).map((_, i) => {
                const pageNumber = i + 1

                return (
                  <Link
                    key={pageNumber}
                    href={`?search=${search}&status=${status}&page=${pageNumber}`}
                    className={`px-3 py-1 border rounded ${
                      page === pageNumber ? 'bg-black text-white' : ''
                    }`}
                  >
                    {pageNumber}
                  </Link>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}