import { auth } from '../app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return session
}

export async function requireAdmin() {
  const session = await requireAuth()

  // if (!session?.user?.email) {
  //   redirect('/login')
  // }

  const { memberService } = await import('@/lib/services/memberService')

  const member = await memberService.getMemberByEmail(session.user.email)

  if (!member || member.role !== 'admin') {
    redirect('/')
  }

  return { session, member }
}