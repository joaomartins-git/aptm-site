import { requireAuth } from '@/lib/auth'
import { memberService } from '@/lib/services/memberService'
import ProfileClient from './ProfileClient'

export default async function SocioPerfilPage() {
  const session = await requireAuth()

  const email = session.user?.email || ''

  const member = await memberService.getMemberByEmail(email)

  //return <ProfileClient userEmail={session.user?.email || ''} />
  return (<ProfileClient userEmail={email} member={member}/>)

}