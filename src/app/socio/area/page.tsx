import { auth } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/api/auth/[...nextauth]/route'

export default async function SocioAreaPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Área de Sócios</h1>
        <form action={async () => {
          'use server'
          await signOut({ redirectTo: '/' })
        }}>
          <Button type="submit" variant="outline">
            Sair
          </Button>
        </form>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <p className="text-lg">
          Bem-vindo, <span className="font-semibold">{session.user?.email}</span>
        </p>
      </div>
    </div>
  )
}