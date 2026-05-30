'use server'

import { memberService } from '@/lib/services/memberService'
import { revalidatePath } from 'next/cache'

export async function approveMemberAction(memberId: string) {
  await memberService.approveMember(memberId)

  revalidatePath('/admin/applications')
  revalidatePath('/admin/members')
}

export async function rejectMemberAction(memberId: string) {
  await memberService.rejectMember(memberId)

  revalidatePath('/admin/applications')
  revalidatePath('/admin/members')
}