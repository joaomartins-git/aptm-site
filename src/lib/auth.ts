import { auth } from '../app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const { memberService } = await import("@/lib/services/memberService")

  const member = await memberService.getMemberById(session.user.id)

  if (!member) {
    redirect("/login")
  }

  // if (!member.profileCompleted) {
  //   redirect("/complete-profile")
  // }

  return {session, member}
}

export async function requireCompletedProfile() {
  const { session, member } = await requireAuth()

  if (!member.profileCompleted) {
    redirect('/complete-profile')
  }

  return { session, member }
}

export async function requireIncompleteProfile() {
    const { session, member } = await requireAuth()

    if (member.profileCompleted) {
        redirect("/socio/area")
    }

    return { session, member }
}

export async function requireAdmin() {
  const {session, member} = await requireCompletedProfile()

  // if (!session?.user?.email) {
  //   redirect('/login')
  // }

  //const { memberService } = await import('@/lib/services/memberService')

  //const member = await memberService.getMemberByEmail(session.user.email)

  if (!member || member.role !== 'admin') {
    redirect('/')
  }

  return { session, member }
}