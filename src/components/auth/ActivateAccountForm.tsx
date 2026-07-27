'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'

const activateSchema = z
  .object({
    memberNumber: z.coerce.number()
      .int()
      .positive('Número de sócio inválido'),

    name: z
      .string()
      .min(3, 'Introduza o nome completo'),

    email: z
      .string()
      .email('Introduza um email válido'),

    password: z
      .string()
      .min(8, 'A password deve ter pelo menos 8 caracteres'),

    confirmPassword: z
      .string()
      .min(8)
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'As passwords não coincidem.',
      path: ['confirmPassword']
    }
  )

type ActivateFormData = z.infer<typeof activateSchema>

type ActivateFormInput = z.input<typeof activateSchema>
type ActivateFormOutput = z.output<typeof activateSchema>

export default function ActivateAccountForm() {

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [serverError, setServerError] = useState('')

  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    ActivateFormInput,
    unknown,
    ActivateFormOutput
  >({
    resolver: zodResolver(activateSchema),
    defaultValues: {
        memberNumber: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
  })

  async function onSubmit(data: ActivateFormData) {

    setLoading(true)

    setServerError('')

    try {

      const response = await fetch('/api/auth/activate', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message)
      }

      setSuccess(true)

      setTimeout(() => {
        router.push("/login")
      }, 2000)

    } catch (error) {

      if (error instanceof Error) {
        setServerError(error.message)
      } else {
        setServerError('Ocorreu um erro inesperado.')
      }

    } finally {

      setLoading(false)

    }

  }

  if (success) {

    return (

      <div className="space-y-6">

        <div className="rounded-md border border-green-200 bg-green-50 p-4">

          <h2 className="font-semibold text-green-800">
            Conta ativada com sucesso!
          </h2>

          <p className="mt-2 text-sm text-green-700">
            Já pode iniciar sessão utilizando o email e a password que acabou de definir.
          </p>

        </div>

        <Button
          className="w-full"
          onClick={() => router.push('/complete-profile')}
        >
          Complete o seu Perfil
        </Button>

      </div>

    )

  }

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <Input
        label="Número de Sócio"
        type="number"
        {...register('memberNumber')}
        error={errors.memberNumber?.message}
      />

      <Input
        label="Nome Completo"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      <Input
        label="Confirmar Password"
        type="password"
        autoComplete="new-password"
        onPaste={(e) => e.preventDefault()}
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      {serverError && (

        <div className="rounded-md border border-red-200 bg-red-50 p-3">

          <p className="text-sm text-red-700">
            {serverError}
          </p>

        </div>

      )}

      <Button
        type="submit"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        {loading
          ? 'A ativar conta...'
          : 'Ativar Conta'}
      </Button>

    </form>

  )

}