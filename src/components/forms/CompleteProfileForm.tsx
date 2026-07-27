'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import UploadPayment from '../UploadPayment'

const completeProfileSchema = z.object({

  birthDate: z.string(),

  phone: z
    .string()
    .min(9, 'Telefone inválido'),

  address: z
    .string()
    .min(5, 'Morada obrigatória'),

  nif: z
    .string()
    .length(9, 'NIF inválido'),

  profession: z
    .string()
    .min(2),

  institution: z
    .string()
    .min(2),

  district: z
    .string()
    .min(2),

  professionalLicenseNumber: z
    .string()
    .optional(),

  specialties: z
    .string(),

  habilitacoes: z
    .array(z.string())
    .default([]),

  profilePhotoUrl: z
    .string()
    .optional(),

  professionalCardUrl: z
    .string()
    .optional(),

  certificatesUrls: z
    .array(z.string())
    .default([])

})

type CompleteProfileFormData = z.infer<typeof completeProfileSchema>

type CompleteProfileFormInput = z.input<typeof completeProfileSchema>
type CompleteProfileFormOutput = z.output<typeof completeProfileSchema>

export default function CompleteProfileForm() {


  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [serverError, setServerError] = useState('')

  const [success, setSuccess] = useState(false)

  const [profilePhotoUrl, setProfilePhotoUrl] = useState("")
  const [professionalCardUrl, setProfessionalCardUrl] = useState("")
  const [certificatesUrls, setCertificatesUrls] = useState<string[]>([])

  const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
  } = useForm<
      CompleteProfileFormInput,
      unknown,
      CompleteProfileFormOutput
  >({
      resolver: zodResolver(completeProfileSchema),
      defaultValues: {
        birthDate: '',
        phone: '',
        address: '',
        nif: '',
        profession: '',
        institution: '',
        district: '',
        professionalLicenseNumber: '',
        specialties: '',
        habilitacoes: [],
        profilePhotoUrl: '',
        professionalCardUrl: '',
        certificatesUrls: [],
      },
    })

    async function onSubmit(data: CompleteProfileFormData) {

        setLoading(true)
        setServerError('')
        const payload = {
            ...data,

            specialties: data.specialties
                .split(',')
                .map(item => item.trim())
                .filter(Boolean),

            profilePhotoUrl,
            professionalCardUrl,
            certificatesUrls,
        }        
        try{
            const response = await fetch('/api/member/complete-profile',{
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message)
            }

            setSuccess(true)

            setTimeout(() => {
                router.push("/socio/area")
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
                    Perfil completado com sucesso!
                </h2>

                <p className="mt-2 text-sm text-green-700">
                    Perfil concluído com sucesso.
                    Será redirecionado para a Área de Sócios...
                </p>

            </div>

            <Button
                className="w-full"
                onClick={() => router.push('/socio/area')}
            >
                Ir para Area de Sócios
            </Button>

        </div>

        )

    }
    return (

        <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        >

        {/* Dados Pessoais */}
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <h2 className="text-lg font-semibold">
                Dados Pessoais
                </h2>

                <div>

                    <Input
                        label="Data de Nascimento"
                        type="date"
                        {...register('birthDate')}
                        error={errors.birthDate?.message}
                        />

                    <Input
                        label="Nº de Telefone"
                        type="text"
                        {...register('phone')}
                        error={errors.phone?.message}
                        />

                    <Input
                        label="Morada"
                        {...register('address')}
                        error={errors.address?.message}
                    />

                    <Input
                        label="Distrito"
                        {...register('district')}
                        error={errors.district?.message}
                    />
                    <Input
                        label="NIF"
                        type="text"
                        inputMode="numeric"
                        {...register('nif')}
                        error={errors.nif?.message}
                        />
                </div>
            
            </div>

        {/* Dados Profissionais */}
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <h2 className="text-lg font-semibold">
                Dados Profissionais
                </h2>
                <div>
                    <Input
                        label="Profissão"
                        {...register('profession')}
                        error={errors.profession?.message}
                        />

                    <Input
                        label="Instituição"
                        {...register('institution')}
                        error={errors.institution?.message}
                    />

                    <Input
                        label="Nº de Cédula Profissional"
                        type="text"
                        {...register('professionalLicenseNumber')}
                        error={errors.professionalLicenseNumber?.message}
                        />

                </div>
            </div>

            {/* Formação */}
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <h2 className="text-lg font-semibold">
                    Formação
                </h2>

                <div className="space-y-3">

                    <label className="font-medium">
                        <p>
                            Habilitações Académicas
                        </p>
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        value="Licenciatura"
                        {...register('habilitacoes')}
                        />
                        Licenciatura
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        value="Pós-Graduação"
                        {...register('habilitacoes')}
                        />
                        Pós-Graduação
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        value="Mestrado"
                        {...register('habilitacoes')}
                        />
                        Mestrado
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        value="Doutoramento"
                        {...register('habilitacoes')}
                        />
                        Doutoramento
                    </label>


                    <Input
                        label="Especialidades"
                        placeholder="Separadas por vírgulas"
                        {...register("specialties")}
                        error={errors.specialties?.message}
                    />
                </div>

            </div>

            {/* Documentos */}

            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <h2 className="text-lg font-semibold">
                    Documentos    
                </h2>

                <div>
                    <label>Foto de Perfil (submeter fotografia) *</label>
                    <UploadPayment
                        onUpload={(urls) => {
                            setProfilePhotoUrl(urls[0])

                            setValue("profilePhotoUrl", urls[0], {
                                shouldValidate: true,
                            })
                        }}
                        />
                    <input
                        type="hidden"
                        {...register("profilePhotoUrl")}
                        />
                </div>
                <div>
                    <label>Cédula Profissional</label>
                    <UploadPayment
                        onUpload={(urls) => {
                            setProfessionalCardUrl(urls[0])

                            setValue("professionalCardUrl", urls[0], {
                                shouldValidate: true,
                            })
                        }}
                    />
                    <input
                        type="hidden"
                        {...register("professionalCardUrl")}
                    />

                </div>
                <div>
                    <label>Habilitações Académicas (submeter certificados de formação) *</label>
                    <UploadPayment
                        onUpload={(urls) => {
                            setCertificatesUrls(urls)

                            setValue("certificatesUrls", urls, {
                                shouldValidate: true,
                            })
                        }}
                    />

                    <input
                        type="hidden"
                        {...register("certificatesUrls")}
                    />
                </div>


            </div>

            {serverError && (

                <div className="rounded-md border border-red-200 bg-red-50 p-3">

                <div className="text-sm text-red-700">
                    {serverError}
                </div>

                </div>

            )}

            <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
            >
                {loading
                ? 'A completar perfil...'
                : 'Completar perfil'}
            </Button>

        </form>

    )












}