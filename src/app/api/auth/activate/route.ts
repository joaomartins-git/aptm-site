import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { memberService } from '@/lib/services/memberService'

const activateSchema = z
  .object({
    memberNumber: z.coerce.number().int().positive(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const data = activateSchema.parse(body)

    const member = await memberService.activateImportedMember({
      memberNumber: data.memberNumber,
      name: data.name,
      email: data.email,
      password: data.password,
    })

    return NextResponse.json(
      {
        success: true,
        memberId: member.id,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid data.',
          errors: error.flatten(),
        },
        {
          status: 400,
        }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error.',
      },
      {
        status: 500,
      }
    )
  }
}