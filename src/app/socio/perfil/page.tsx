import { requireAuth, requireCompletedProfile } from '@/lib/auth'
import { memberService } from '@/lib/services/memberService'
import ProfileClient from './ProfileClient'

export default async function SocioPerfilPage() {
  const {member} = await requireCompletedProfile()

  //const email = member.email || ''

  if (!member) {
      return null
  }

  const memberWithMemberships =
    await memberService.getMemberByEmail(member.email!)

  //return <ProfileClient userEmail={session.user?.email || ''} />
  return (
    <ProfileClient 
      userEmail={member.email || ''} 
      member={memberWithMemberships}/>
  )

}