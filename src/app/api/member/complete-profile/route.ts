import { NextResponse } from 'next/server'

import { requireAuth } from '@/lib/auth'

import { memberService } from '@/lib/services/memberService'

export async function POST(request: Request) {

  try {

    const {member} = await requireAuth()

    console.log(member.profileCompleted)

    const body = await request.json()

    await memberService.completeProfile(
      member.id,
      //session.user.memberNumber,
      body
    )

    return NextResponse.json({
      success: true
    })

  } catch (error) {

  console.error("Complete profile error:");
  console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Erro interno'
      },
      {
        status: 400
      }
    )

  }

}