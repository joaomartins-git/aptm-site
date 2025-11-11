'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { validateContactForm, type ContactFormInput } from '@/lib/validations'
import { contactFormSchema } from '@/lib/validations'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  User,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const contactInfo = {
  address: {
    title: 'Endereço',
    icon: MapPin,
    lines: [
      'Rua da Saúde, 123',
      '1000-001 Lisboa',
      'Portugal'
    ]
  },
  phone: {
    title: 'Telefone',
    icon: Phone,
    lines: ['+351 210 000 000']
  },
  email: {
    title: 'Email',
    icon: Mail,
    lines: ['geral@aptm.pt']
  },
  hours: {
    title: 'Horário',
    icon: Clock,
    lines: [
      'Segunda a Sexta: 9h00 - 18h00',
      'Sábado: 9h00 - 13h00',
      'Fechado aos domingos e feriados'
    ]
  }
}


const socialMedia = [
  {
    name: 'LinkedIn',
    href: '#',
    description: 'Conecte-se profissionalmente'
  },
  {
    name: 'Facebook',
    href: '#',
    description: 'Siga-nos no Facebook'
  },
  {
    name: 'Instagram',
    href: '#',
    description: 'Acompanhe nosso Instagram'
  },
  {
    name: 'Twitter',
    href: '#',
    description: 'Siga-nos no Twitter'
  }
]

const faqItems = [
  {
    question: 'Como me tornar membro da APTM?',
    answer: 'Para se tornar membro, preencha o formulário de contato selecionando "Informações sobre Membros" ou envie um email para geral@aptm.pt. Enviaremos o formulário de inscrição e informações sobre os benefícios.'
  },
  {
    question: 'Quais são os benefícios de ser membro?',
    answer: 'Os membros têm acesso a descontos em formações, eventos exclusivos, recursos educacionais, plataforma de networking, certificação APTM e muito mais.'
  },
  {
    question: 'Como posso participar dos eventos?',
    answer: 'Nossos eventos são abertos tanto para membros quanto para não membros. Membros têm descontos especiais. Verifique nosso calendário de eventos ou entre em contato para mais informações.'
  },
  {
    question: 'Oferecem formação à distância?',
    answer: 'Sim, oferecemos cursos online e programas híbridos. Nossa plataforma de ensino online está em desenvolvimento e será lançada em breve.'
  }
]

export default function ContactPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    clearErrors
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        if (result.mocked) {
          setSubmitMessage('Mensagem enviada com sucesso! (Modo de desenvolvimento)')
        } else {
          setSubmitMessage('Mensagem enviada com sucesso! Responderemos o mais breve possível.')
        }
        reset()
      } else {
        // Handle different error types
        if (response.status === 429) {
          setSubmitStatus('error')
          setSubmitMessage('Muitas tentativas. Por favor, aguarde um minuto antes de tentar novamente.')
        } else if (response.status === 400 && Array.isArray(result.details)) {
          // Show validation errors from server
          setSubmitStatus('error')
          const errorMessages = result.details.map((detail: { message: string }) => detail.message).join(', ')
          setSubmitMessage(`Erro de validação: ${errorMessages}`)
        } else {
          setSubmitStatus('error')
          setSubmitMessage(result.error || 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.')
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Ocorreu um erro ao enviar sua mensagem. Por favor, verifique sua conexão e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Contacto"
        title="Estamos Aqui para Ajudar"
        description="Entre em contacto connosco para tirar dúvidas, solicitar informações sobre membros, formações, eventos ou qualquer outra questão sobre terapia da mão."
        primaryAction={{
          label: "Enviar Mensagem",
          href: "#contact-form"
        }}
        secondaryAction={{
          label: "Perguntas Frequentes",
          href: "#faq"
        }}
      />

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Informações de Contacto
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Várias formas de entrar em contacto connosco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(contactInfo).map(([key, info]) => {
              const IconComponent = info.icon
              return (
                <Card key={key} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {info.lines.map((line, index) => (
                        <p key={index} className="text-muted-foreground">
                          {line}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30" id="contact-form">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Envie-nos uma Mensagem
              </h2>
              <p className="text-lg text-muted-foreground">
                Responderemos a sua mensagem o mais breve possível
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" aria-hidden="true" />
                      Formulário de Contacto
                    </CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo e entraremos em contacto consigo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* Name Field */}
                      <Input
                        label="Nome Completo"
                        {...register('name')}
                        error={errors.name?.message}
                        placeholder="O seu nome completo"
                      />

                      {/* Email Field */}
                      <Input
                        label="Email"
                        type="email"
                        {...register('email')}
                        error={errors.email?.message}
                        placeholder="o.seu.email@exemplo.com"
                      />

                      
                      {/* Message Field */}
                      <Textarea
                        label="Mensagem"
                        {...register('message')}
                        error={errors.message?.message}
                        placeholder="Descreva detalhadamente a sua dúvida ou solicitação..."
                        rows={6}
                      />

                      {/* Status Messages */}
                      {submitStatus === 'success' && (
                        <div
                          className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg"
                          role="alert"
                          aria-live="polite"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                          <p className="text-sm text-green-800">{submitMessage}</p>
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div
                          className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg"
                          role="alert"
                          aria-live="assertive"
                        >
                          <AlertCircle className="h-5 w-5 text-red-600" aria-hidden="true" />
                          <p className="text-sm text-red-800">{submitMessage}</p>
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                      >
                        <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Side Information */}
              <div className="space-y-8">
                {/* Quick Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contacto Rápido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                      <div>
                        <div className="font-medium">Telefone</div>
                        <div className="text-sm text-muted-foreground">+351 210 000 000</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">geral@aptm.pt</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                      <div>
                        <div className="font-medium">Horário</div>
                        <div className="text-sm text-muted-foreground">9h00 - 18h00</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Urgências</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Para assuntos urgentes, favor contactar diretamente:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-red-500" aria-hidden="true" />
                        <span className="text-sm font-medium">+351 910 000 000</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Disponível 24/7 para emergências
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Redes Sociais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {socialMedia.map((social, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{social.name}</div>
                            <div className="text-xs text-muted-foreground">{social.description}</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Seguir
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background" id="faq">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Respostas para as perguntas mais comuns
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button onClick={() => router.push('/contact')}>
                Ainda tem dúvidas? Entre em contacto
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Visite-nos
            </h2>
            <p className="text-lg text-muted-foreground">
              A nossa sede está localizada no coração de Lisboa
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-semibold mb-2">Mapa Interativo</h3>
                    <p className="text-muted-foreground mb-4">
                      Mapa do Google será integrado aqui
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rua da Saúde, 123<br />
                      1000-001 Lisboa, Portugal
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}