'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

const loginSchema = z.object({
  email: z
    .string()
    .email("Por favor, introduza um email válido")
    .min(1, "O email é obrigatório"),
  password: z
    .string()
    .min(1, "A password é obrigatória")
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setAuthError('')

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (result?.error) {
        setAuthError('Credenciais inválidas')
      } else if (result?.ok) {
        router.push('/socio/area')
      } else {
        setAuthError('Ocorreu um erro ao tentar fazer login')
      }
    } catch (error) {
      setAuthError('Ocorreu um erro ao tentar fazer login')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login de Sócio</CardTitle>
            <CardDescription>
              Introduza as suas credenciais para aceder à área de sócios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="socio@aptm.pt"
                {...register('email')}
                error={errors.email?.message}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Introduza a sua password"
                {...register('password')}
                error={errors.password?.message}
                required
              />

              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">{authError}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? 'A entrar...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não é sócio?{' '}
                <Link 
                  href="/join" 
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Tornar-se Sócio
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}