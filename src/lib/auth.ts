import { auth } from '../app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return session
}