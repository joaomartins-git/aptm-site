import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { PROFESSIONS, PORTUGUESE_DISTRICTS } from '@/lib/site'

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, { timestamp: number; count: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 1

// Join form validation schema
const joinFormSchema = z.object({
  nome: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres"),
  email: z
    .string()
    .email("Por favor, introduza um email válido")
    .max(255, "O email não pode ter mais de 255 caracteres"),
  telemovel: z
    .string()
    .regex(/^(9[1236]\d{7})?$/, "Telemóvel inválido. Deve começar com 9 e ter 9 dígitos")
    .optional()
    .or(z.literal('')),
  profissao: z
    .enum(PROFESSIONS, {
      message: "Por favor, selecione uma profissão"
    }),
  numCedula: z
    .string()
    .max(50, "O número da cédula não pode ter mais de 50 caracteres")
    .optional()
    .or(z.literal('')),
  distrito: z
    .enum(PORTUGUESE_DISTRICTS, {
      message: "Por favor, selecione um distrito"
    }),
  instituicao: z
    .string()
    .max(200, "A instituição não pode ter mais de 200 caracteres")
    .optional()
    .or(z.literal('')),
  mensagem: z
    .string()
    .max(1000, "A mensagem não pode ter mais de 1000 caracteres")
    .optional()
    .or(z.literal('')),
  plano: z
    .enum(["semestral", "anual"], {
      required_error: "Por favor, selecione um plano",
      invalid_type_error: "Plano inválido"
    })
})

// File validation
function validateFile(file: File): string | null {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]

  if (file.size > maxSize) {
    return "O ficheiro não pode ter mais de 5MB"
  }

  if (!allowedTypes.includes(file.type)) {
    return "Apenas ficheiros PDF, JPG e PNG são permitidos"
  }

  return null
}

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

    // Parse form data
    const formData = await request.formData()

    // Extract form fields
    const fields = {
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
      telemovel: formData.get('telemovel') as string || '',
      profissao: formData.get('profissao') as string,
      numCedula: formData.get('numCedula') as string || '',
      distrito: formData.get('distrito') as string,
      instituicao: formData.get('instituicao') as string || '',
      mensagem: formData.get('mensagem') as string || '',
      plano: formData.get('plano') as string
    }

    // Extract and validate file
    const file = formData.get('comprovativo') as File
    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "Por favor, selecione um comprovativo de pagamento" },
        { status: 400 }
      )
    }

    const fileError = validateFile(file)
    if (fileError) {
      return NextResponse.json(
        { error: fileError },
        { status: 400 }
      )
    }

    // Validate form fields
    const validationResult = joinFormSchema.safeParse(fields)

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {}

      validationResult.error.issues.forEach(issue => {
        const field = issue.path.join('.')
        fieldErrors[field] = issue.message
      })

      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Check if we should send real email or mock
    const resendApiKey = process.env.RESEND_API_KEY
    const contactRecipient = process.env.CONTACT_RECIPIENT

    if (resendApiKey && contactRecipient) {
      // Send real email via Resend
      try {
        const resend = new Resend(resendApiKey)

        // Read file content for attachment
        let attachment: any = undefined
        try {
          const fileBuffer = await file.arrayBuffer()
          attachment = {
            filename: file.name,
            content: Buffer.from(fileBuffer),
          }
        } catch (fileError) {
          console.error('Failed to process file attachment:', fileError)
        }

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
              Nova Candidatura de Sócio APTM
            </h2>

            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 15px;">Dados Pessoais</h3>
              <p><strong>Nome:</strong> ${data.nome}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              ${data.telemovel ? `<p><strong>Telemóvel:</strong> ${data.telemovel}</p>` : ''}
              <p><strong>Profissão:</strong> ${data.profissao}</p>
              ${data.numCedula ? `<p><strong>Número da Cédula:</strong> ${data.numCedula}</p>` : ''}
              <p><strong>Distrito:</strong> ${data.distrito}</p>
              ${data.instituicao ? `<p><strong>Instituição:</strong> ${data.instituicao}</p>` : ''}
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 15px;">Dados da Adesão</h3>
              <p><strong>Plano Escolhido:</strong> ${data.plano === 'semestral' ? 'Semestral (€85)' : 'Anual (€150)'}</p>
              ${attachment ? '<p><strong>Comprovativo:</strong> Em anexo</p>' : '<p style="color: #d9534f;"><strong>Comprovativo:</strong> Falha ao processar anexo</p>'}
            </div>

            ${data.mensagem ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 15px;">Mensagem</h3>
              <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
                ${data.mensagem.replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : ''}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>Esta candidatura foi submetida através do formulário de adesão do site APTM.</p>
              <p>Data de submissão: ${new Date().toLocaleString('pt-PT')}</p>
            </div>
          </div>
        `

        const emailPayload: any = {
          from: 'APTM Join Form <onboarding@resend.dev>',
          to: [contactRecipient],
          subject: `Nova candidatura de sócio: ${data.nome}`,
          html: emailHtml,
          reply_to: data.email
        }

        // Add attachment if available
        if (attachment) {
          emailPayload.attachments = [attachment]
        }

        const { data: emailData, error } = await resend.emails.send(emailPayload)

        if (error) {
          console.error('Resend error:', error)
          return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
          )
        }

        console.log('Email sent successfully:', emailData)
        return NextResponse.json({
          ok: true,
          message: "Candidatura submetida com sucesso! Entraremos em contacto brevemente."
        })

      } catch (emailError) {
        console.error('Email service error:', emailError)
        return NextResponse.json(
          { error: "Email service temporarily unavailable" },
          { status: 503 }
        )
      }
    } else {
      // Mock delivery for development
      console.log('=== JOIN FORM SUBMISSION (MOCK MODE) ===')
      console.log('Timestamp:', new Date().toISOString())
      console.log('Nome:', data.nome)
      console.log('Email:', data.email)
      console.log('Telemóvel:', data.telemovel || 'N/A')
      console.log('Profissão:', data.profissao)
      console.log('Número da Cédula:', data.numCedula || 'N/A')
      console.log('Distrito:', data.distrito)
      console.log('Instituição:', data.instituicao || 'N/A')
      console.log('Plano:', data.plano)
      console.log('Mensagem:', data.mensagem || 'N/A')
      console.log('File name:', file.name)
      console.log('File size:', file.size, 'bytes')
      console.log('File type:', file.type)
      console.log('==============================================')

      return NextResponse.json({
        ok: true,
        mocked: true,
        message: "Candidatura submetida com sucesso! (Modo de desenvolvimento)"
      })
    }

  } catch (error) {
    console.error('Join API error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}