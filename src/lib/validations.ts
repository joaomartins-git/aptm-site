import { z } from "zod"
import type { ContactForm } from "@/types"

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