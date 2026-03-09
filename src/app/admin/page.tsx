import { requireAdmin } from '@/lib/auth'

export default async function AdminPage() {
  const { member } = await requireAdmin()

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-3xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <p className="text-muted-foreground">
        Bem-vindo, {member.name}
      </p>

      <div className="mt-8">
        <p>Painel administrativo em construção.</p>
      </div>
    </div>
  )
}