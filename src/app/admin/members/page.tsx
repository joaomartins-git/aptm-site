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

export default async function AdminMembersPage() {
  await requireAdmin()

  const members = await memberService.getAllMembersWithStatus()

  return (
    <div className="container mx-auto px-6 py-20">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Sócios</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
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
                  const status = membership?.status

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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}