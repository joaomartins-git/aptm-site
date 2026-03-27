import { NextRequest, NextResponse } from "next/server"
import { memberService } from "@/lib/services/memberService"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ memberId: string }> }
) {
  const { memberId } = await context.params

  const body = await request.json()

  const membership = await memberService.renewMembership(
    memberId,
    body.type
  )

  return NextResponse.json(membership)
}