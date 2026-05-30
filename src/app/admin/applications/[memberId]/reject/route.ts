import { NextResponse } from 'next/server'
import { db } from '@/db'
import { members } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(
  request: Request,
  context: { params: Promise<{ memberId: string }> }
) {

  const { memberId } = await context.params

  await db
    .update(members)
    .set({
      status: 'rejected'
    })
    .where(eq(members.id, memberId))

  return NextResponse.json({
    success: true
  })
}