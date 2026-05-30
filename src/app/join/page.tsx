'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { IBAN, MBWAY_PHONE, MEMBERSHIP_FEES, PROFESSIONS, PORTUGUESE_DISTRICTS, HABILITATIONS } from '@/lib/site'
import { joinFormSchema } from '@/lib/validations'
import { CheckCircle, Upload, CreditCard, Phone } from 'lucide-react'
import type { JoinFormInput } from '@/lib/validations'
import UploadPayment from '@/components/UploadPayment'

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [paymentProofUrl, setPaymentProofUrl] = useState("")

  const [photoUrl, setPhotoUrl] = useState("")
  const [professionalCardUrl, setProfessionalCardUrl] = useState("")
  const [certificatesUrls, setCertificatesUrls] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch
  } = useForm<JoinFormInput>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      telemovel: '',
      numCedula: '',
      instituicao: '',
      mensagem: '',
      paymentProofUrl: "",
      photoUrl: "",
      professionalCardUrl: "",
      certificatesUrls: [],
    }
  })

  const onSubmit = async (data: JoinFormInput) => {
    console.log("SUBMIT FIRED", data)
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const formData = new FormData()

      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'comprovativo' && value !== undefined) {
          formData.append(key, value as string)
        }
      })

      // Handle file upload
      // if (data.comprovativo) {
      //   formData.append('comprovativo', data.comprovativo)
      // }

      const payload = {
        ...data,
        paymentProofUrl,
        photoUrl,
        professionalCardUrl,
        certificatesUrls
      }

      if (!paymentProofUrl) {
        setSubmitStatus('error')
        setSubmitMessage('Por favor carregue o comprovativo de pagamento.')
        setIsSubmitting(false)
        return
      }

      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Candidatura submetida com sucesso!')
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Ocorreu um erro ao submeter a candidatura.')

        // Handle field errors from validation
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, message]) => {
            setError(field as keyof JoinFormInput, {
              message: message as string
            })
          })
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     setValue('comprovativo', file)
  //   }
  // }

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Tornar-se Sócio"
        title="Junte-se à APTM"
        description="Faça parte da principal associação de terapia da mão em Portugal e aceda a benefícios exclusivos, formação contínua e uma rede de profissionais dedicados."
        primaryAction={{
          label: "Submeter Candidatura",
          href: "#formulario"
        }}
      />

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <div className="text-center mb-12">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Para se tornar sócio da APTM, preencha o formulário abaixo com os seus dados
                e efetue o pagamento da quota correspondente ao plano escolhido.
              </p>
            </div>

            {/* Fees and Payment Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Fees Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Quotas de Associado
                  </CardTitle>
                  <CardDescription>
                    Escolha o plano que melhor se adapta às suas necessidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Plano Semestral</h4>
                        <p className="text-sm text-muted-foreground">Validade: 6 meses</p>
                      </div>
                      <div className="text-2xl font-bold text-primary">€{MEMBERSHIP_FEES.semestral}</div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Plano Anual</h4>
                        <p className="text-sm text-muted-foreground">Validade: 12 meses</p>
                      </div>
                      <div className="text-2xl font-bold text-primary">€{MEMBERSHIP_FEES.anual}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados para Pagamento</CardTitle>
                  <CardDescription>
                    Efetue o pagamento através de um dos seguintes métodos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">Transferência Bancária</h4>
                        <p className="text-sm text-muted-foreground mb-2">IBAN:</p>
                        <p className="font-mono text-sm bg-background p-2 rounded border">{IBAN}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">MB Way</h4>
                        <p className="text-sm text-muted-foreground mb-2">Telefone:</p>
                        <p className="font-mono text-sm bg-background p-2 rounded border">{MBWAY_PHONE}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Após efetuar o pagamento, carregue o comprovativo no formulário abaixo.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <Card id="formulario">
              <CardHeader>
                <CardTitle>Formulário de Adesão</CardTitle>
                <CardDescription>
                  Preencha todos os campos obrigatórios e carregue o comprovativo de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit, (errors) => {console.log("FORM ERRORS", errors)})} className="space-y-6">

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nome Completo *"
                      {...register('nome')}
                      error={errors.nome?.message}
                      required
                    />
                    <Input
                      label="Data de Nascimento *"
                      type="date"
                      {...register('dataNascimento')}
                      error={errors.dataNascimento?.message}
                      required
                    />
                    <Input
                      label="Morada Fiscal *"
                      type="address"
                      {...register('morada')}
                      error={errors.morada?.message}
                      required
                    />
                    <Input
                      label="NIF *"
                      type="NIF"
                      {...register('nif')}
                      error={errors.nif?.message}
                      required
                    />                    
                    <Input
                      label="Email *"
                      type="email"
                      {...register('email')}
                      error={errors.email?.message}
                      required
                    />
                    <Input
                      label="Contacto Telefónico"
                      type="tel"
                      placeholder="912345678"
                      {...register('telemovel')}
                      error={errors.telemovel?.message}
                    />
                    <div>
                      <Select
                        label="Profissão *"
                        options={PROFESSIONS.map(prof => ({ value: prof, label: prof }))}
                        {...register('profissao')}
                        error={errors.profissao?.message}
                        required
                      />
                    </div>
                    <Input
                      label="Número da Cédula"
                      placeholder="Opcional"
                      {...register('numCedula')}
                      error={errors.numCedula?.message}
                    />
                    <div>
                      <Select
                        label="Distrito *"
                        options={PORTUGUESE_DISTRICTS.map(dist => ({ value: dist, label: dist }))}
                        {...register('distrito')}
                        error={errors.distrito?.message}
                        required
                      />
                    </div>
                    <Input
                      label="Instituição"
                      placeholder="Opcional"
                      {...register('instituicao')}
                      error={errors.instituicao?.message}
                    />
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Habilitações Académicas *
                      </label>

                      {["Estudante", "Licenciatura", "Pós-Graduação", "Mestrado", "Doutoramento"].map((item) => (
                        <label key={item} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={item}
                            {...register("habilitacoes")}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Habilitações Académicas (submeter certificados de formação) *
                    </label>
                    <UploadPayment
                      // multiple
                      onUpload={(urls) => {
                        console.log(urls)
                        setCertificatesUrls(urls as string[])
                        setValue("certificatesUrls", urls as string[], {
                          shouldValidate: true,
                        })
                      }}
                    />
                  </div>

                  <input
                    type="hidden"
                    {...register("certificatesUrls")}
                  />


                  <div className="text-sm font-medium mb-3 block">
                    <label>
                      Foto (submeter fotografia) *
                    </label>
                      <UploadPayment
                        onUpload={(url) => {
                          console.log(url)
                          setPhotoUrl(url[0])
                          setValue("photoUrl", url[0], {
                            shouldValidate: true,
                          })
                        }}
                      />
                  </div>

                  <input
                    type="hidden"
                    {...register("photoUrl")}
                  />

                  <div className="text-sm font-medium mb-3 block">
                    <label>
                      Cédula Profissional (submeter ficheiro)
                    </label>
                    <UploadPayment
                      onUpload={(url) => {
                        console.log(url)
                        setProfessionalCardUrl(url[0])
                        setValue("professionalCardUrl", url[0], {
                          shouldValidate: true,
                        })
                      }}
                    />
                  </div>

                  <input
                    type="hidden"
                    {...register("professionalCardUrl")}
                  />

                  {/* Message */}
                  <Textarea
                    label="Mensagem (opcional)"
                    placeholder="Alguma informação adicional que considere relevante..."
                    rows={4}
                    {...register('mensagem')}
                    error={errors.mensagem?.message}
                  />

                  {/* Plan Selection */}
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
                      Plano de Quota *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="relative flex cursor-pointer">
                        <input
                          type="radio"
                          value="semestral"
                          {...register('plano')}
                          className="peer sr-only"
                        />
                        <div className="w-full p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-hover:border-primary/50">
                          <div className="text-center">
                            <h4 className="font-semibold">Semestral</h4>
                            <p className="text-2xl font-bold text-primary mt-1">€{MEMBERSHIP_FEES.semestral}</p>
                            <p className="text-sm text-muted-foreground">6 meses</p>
                          </div>
                        </div>
                      </label>
                      <label className="relative flex cursor-pointer">
                        <input
                          type="radio"
                          value="anual"
                          {...register('plano')}
                          className="peer sr-only"
                        />
                        <div className="w-full p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-hover:border-primary/50">
                          <div className="text-center">
                            <h4 className="font-semibold">Anual</h4>
                            <p className="text-2xl font-bold text-primary mt-1">€{MEMBERSHIP_FEES.anual}</p>
                            <p className="text-sm text-muted-foreground">12 meses</p>
                          </div>
                        </div>
                      </label>
                    </div>
                    {errors.plano && (
                      <p className="text-sm text-destructive mt-2" role="alert">
                        {errors.plano.message}
                      </p>
                    )}
                  </div>

                  {/* File Upload */}
                  {/* <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
                      Comprovativo de Pagamento *
                    </label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Clique para carregar ou arraste o ficheiro
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, JPG ou PNG (máx. 5MB)
                        </p>
                        {watch('comprovativo') && (
                          <p className="text-sm text-primary mt-2">
                            Ficheiro selecionado: {(watch('comprovativo') as File)?.name}
                          </p>
                        )}
                      </label>
                    </div>
                    {errors.comprovativo && (
                      <p className="text-sm text-destructive mt-2" role="alert">
                        {errors.comprovativo.message}
                      </p>
                    )}
                  </div> */}
                  {/* Upload Payment Proof */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Comprovativo de Pagamento *
                    </label>

                    <UploadPayment
                      onUpload={(url) => {
                        console.log(url)
                        setPaymentProofUrl(url[0])

                          setValue("paymentProofUrl", url[0], {
                            shouldValidate: true,
                          })
                      }}
                    />

                    {paymentProofUrl && (
                      <p className="text-sm text-primary mt-2">
                        Upload concluído ✅
                      </p>
                    )}

                    {!paymentProofUrl && submitStatus === 'error' && (
                      <p className="text-sm text-destructive mt-2">
                        Por favor faça upload do comprovativo
                      </p>
                    )}
                  </div>
                  <input
                      type="hidden"
                      {...register("paymentProofUrl")}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="min-w-[200px]"
                    >
                      {isSubmitting ? 'A submeter...' : 'Submeter Candidatura'}
                    </Button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm text-green-800">{submitMessage}</p>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{submitMessage}</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}