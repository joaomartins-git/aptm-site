import { requireAdmin } from '@/lib/auth'
import { memberService } from '@/lib/services/memberService'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { notFound } from 'next/navigation'
import RenewMembershipButton from "@/components/admin/RenewMembershipButton"

type Props = {
  params: {
    memberId: string
  }
}

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

export default async function AdminMemberDetail({ params }: { params: Promise<{ memberId: string }> }) {
  await requireAdmin()

  const { memberId } = await params

  const member = await memberService.getMemberWithMemberships(memberId)

  if (!member) {
    notFound()
  }

  return (
    <div className="container mx-auto px-6 py-20 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Sócio</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p><strong>Nome:</strong> {member.name}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Nº de Sócio:</strong> {member.memberNumber}</p>
          <p><strong>Função:</strong> {member.role}</p>
          <p><strong>Estado:</strong> {member.status}</p>
          <p><RenewMembershipButton memberId={member.id} /></p>
        </CardContent>
      </Card>
      <h2 className="text-xl font-semibold mt-8 mb-4">
        Histórico de Quotas
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Início</th>
            <th className="p-2 text-left">Fim</th>
            <th className="p-2 text-left">Estado</th>
          </tr>
        </thead>

        <tbody>
          {member.memberships.map((membership) => (
            <tr key={membership.id} className="border-t">
              <td className="p-2">{membership.type}</td>
              <td className="p-2">{membership.startDate}</td>
              <td className="p-2">{membership.endDate}</td>
              <td className="p-2">
                {membership.status === "active" && "🟢 Ativa"}
                {membership.status === "expired" && "🔴 Expirada"}
                {membership.status === "upcoming" && "🔵 Próxima"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}