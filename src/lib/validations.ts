import { z } from "zod"
import type { ContactForm } from "@/types"
import { PROFESSIONS, PORTUGUESE_DISTRICTS } from "./site"

export const contactFormSchema = z.object({
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

export type ContactFormInput = z.infer<typeof contactFormSchema>

export function validateContactForm(data: ContactForm): ContactFormInput {
  return contactFormSchema.parse(data)
}

export function validateContactFormSafe(data: unknown) {
  return contactFormSchema.safeParse(data)
}

// Join form validation schema
export const joinFormSchema = z.object({
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
    .optional(),
  profissao: z
    .enum(PROFESSIONS, {
      message: "Por favor, selecione uma profissão"
    }),
  numCedula: z
    .string()
    .max(50, "O número da cédula não pode ter mais de 50 caracteres")
    .optional(),
  distrito: z
    .enum(PORTUGUESE_DISTRICTS, {
      required_error: "Por favor, selecione um distrito",
      invalid_type_error: "Distrito inválido"
    }),
  instituicao: z
    .string()
    .max(200, "A instituição não pode ter mais de 200 caracteres")
    .optional(),
  mensagem: z
    .string()
    .max(1000, "A mensagem não pode ter mais de 1000 caracteres")
    .optional(),
  plano: z
    .enum(["semestral", "anual"], {
      required_error: "Por favor, selecione um plano",
      invalid_type_error: "Plano inválido"
    }),
  comprovativo: z
    .instanceof(File, { message: "Por favor, selecione um ficheiro" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB
      "O ficheiro não pode ter mais de 5MB"
    )
    .refine(
      (file) => ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(file.type),
      "Apenas ficheiros PDF, JPG e PNG são permitidos"
    )
})

export type JoinFormInput = z.infer<typeof joinFormSchema>

export function validateJoinForm(data: FormData) {
  // Extract file from FormData
  const comprovativoFile = data.get('comprovativo') as File

  // Convert FormData to object for validation
  const formData = {
    nome: data.get('nome'),
    email: data.get('email'),
    telemovel: data.get('telemovel') || undefined,
    profissao: data.get('profissao'),
    numCedula: data.get('numCedula') || undefined,
    distrito: data.get('distrito'),
    instituicao: data.get('instituicao') || undefined,
    mensagem: data.get('mensagem') || undefined,
    plano: data.get('plano'),
    comprovativo: comprovativoFile
  }

  return joinFormSchema.parse(formData)
}

export function validateJoinFormSafe(data: FormData) {
  // Extract file from FormData
  const comprovativoFile = data.get('comprovativo') as File

  // Convert FormData to object for validation
  const formData = {
    nome: data.get('nome'),
    email: data.get('email'),
    telemovel: data.get('telemovel') || undefined,
    profissao: data.get('profissao'),
    numCedula: data.get('numCedula') || undefined,
    distrito: data.get('distrito'),
    instituicao: data.get('instituicao') || undefined,
    mensagem: data.get('mensagem') || undefined,
    plano: data.get('plano'),
    comprovativo: comprovativoFile
  }

  return joinFormSchema.safeParse(formData)
}