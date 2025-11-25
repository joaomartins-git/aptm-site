import { requireAuth } from '@/lib/auth'
import ProfileClient from './ProfileClient'

export default async function SocioPerfilPage() {
  const session = await requireAuth()

  return <ProfileClient userEmail={session.user?.email || ''} />
}