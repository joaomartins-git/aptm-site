import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, { timestamp: number; count: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 1

// Contact form validation schema (matches frontend schema without subject)
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres"),
  email: z
    .string()
    .email("Por favor, introduza um email válido")
    .max(255, "O email não pode ter mais de 255 caracteres"),
  message: z
    .string()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "A mensagem não pode ter mais de 2000 caracteres")
})

// Rate limiting function
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const existing = rateLimitStore.get(ip)

  if (!existing || now - existing.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { timestamp: now, count: 1 })
    return false
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  existing.count++
  return false
}

// Clean up old rate limit entries
function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(ip)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Clean up old rate limit entries periodically
    if (Math.random() < 0.01) { // 1% chance to cleanup on each request
      cleanupRateLimitStore()
    }

    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown'

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      )
    }

    const { name, email, message } = validationResult.data

    // Check if we should send real email or mock
    const resendApiKey = process.env.RESEND_API_KEY
    const contactRecipient = process.env.CONTACT_RECIPIENT

    if (resendApiKey && contactRecipient) {
      // Send real email via Resend
      try {
        const resend = new Resend(resendApiKey)

        const { data, error } = await resend.emails.send({
          from: 'APTM Contact Form <onboarding@resend.dev>',
          to: [contactRecipient],
          subject: `Nova mensagem de contacto de ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                Nova Mensagem de Contacto
              </h2>

              <div style="margin: 20px 0;">
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong></p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                <p>Esta mensagem foi enviada através do formulário de contacto do site APTM.</p>
              </div>
            </div>
          `,
          reply_to: email
        })

        if (error) {
          console.error('Resend error:', error)
          return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
          )
        }

        console.log('Email sent successfully:', data)
        return NextResponse.json({ ok: true })

      } catch (emailError) {
        console.error('Email service error:', emailError)
        return NextResponse.json(
          { error: "Email service temporarily unavailable" },
          { status: 503 }
        )
      }
    } else {
      // Mock delivery for development
      console.log('=== CONTACT FORM SUBMISSION (MOCK MODE) ===')
      console.log('Timestamp:', new Date().toISOString())
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Message:', message)
      console.log('==============================================')

      return NextResponse.json({
        ok: true,
        mocked: true,
        message: "Message logged (development mode)"
      })
    }

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}