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
  dataNascimento: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Data inválida"
    }),
  morada: z
    .string()
    .min(5, "Morada inválida")
    .max(255, "Morada demasiado longa"),
  nif: z
    .string()
    .regex(/^\d{9}$/, "NIF deve ter 9 dígitos"),
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
      message: "Por favor, selecione um distrito"
    }),
  instituicao: z
    .string()
    .max(200, "A instituição não pode ter mais de 200 caracteres")
    .optional(),
  habilitacoes: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma habilitação"),
  mensagem: z
    .string()
    .max(1000, "A mensagem não pode ter mais de 1000 caracteres")
    .optional(),
  plano: z
    .enum(["semestral", "anual"], {
      message: "Por favor, selecione um plano"
    }),
  paymentProofUrl: z
    .string()
    .url("URL inválido"),

  certificatesUrls: z
    .array(z.string().url()),

  photoUrl: z
    .string()
    .url(),

  professionalCardUrl: z
    .string()
    .url(),
})

export type JoinFormInput = z.infer<typeof joinFormSchema>

export function validateJoinForm(data: FormData) {
  // Extract file from FormData
  //const comprovativoFile = data.get('comprovativo') as File

  // Convert FormData to object for validation
  const formData = {
    nome: data.get('nome'),
    morada: data.get('morada'),
    nif: data.get('nif'),
    dataNascimento: data.get('dataNascimento'),
    email: data.get('email'),
    telemovel: data.get('telemovel') || undefined,
    profissao: data.get('profissao'),
    numCedula: data.get('numCedula') || undefined,
    distrito: data.get('distrito'),
    instituicao: data.get('instituicao') || undefined,
    habilitacoes: data.getAll('habilitacoes'),
    mensagem: data.get('mensagem') || undefined,
    plano: data.get('plano'),
    paymentProofUrl: data.get('paymentProofUrl'),
    photoUrl: data.get('photoUrl'),
    professionalCardUrl: data.get('professionalCardUrl'),
    certificatesUrls: data.get('certificatesUrls')
    
    // comprovativo: comprovativoFile
  }

  return joinFormSchema.parse(formData)
}

export function validateJoinFormSafe(data: FormData) {
  // Extract file from FormData
  // const comprovativoFile = data.get('comprovativo') as File

  // Convert FormData to object for validation
  const formData = {
    nome: data.get('nome'),
    morada: data.get('morada'),
    nif: data.get('nif'),
    dataNascimento: data.get('dataNascimento'),
    email: data.get('email'),
    telemovel: data.get('telemovel') || undefined,
    profissao: data.get('profissao'),
    numCedula: data.get('numCedula') || undefined,
    distrito: data.get('distrito'),
    instituicao: data.get('instituicao') || undefined,
    habilitacoes: data.getAll('habilitacoes'),
    mensagem: data.get('mensagem') || undefined,
    plano: data.get('plano'),
    paymentProofUrl: data.get('paymentProofUrl'),
    photoUrl: data.get('photoUrl'),
    professionalCardUrl: data.get('professionalCardUrl'),
    certificatesUrls: data.get('certificatesUrls')
    // comprovativo: comprovativoFile
  }

  return joinFormSchema.safeParse(formData)
}