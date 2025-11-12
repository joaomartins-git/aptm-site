'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/Badge'
import { Users, Search, Handshake, Award, BookOpen, Target, CheckCircle, Clock } from 'lucide-react'
import { getServices } from '@/lib/content'
import type { Service, ServicesData  } from '@/types'

// Icon mapping
const iconMap = {
  Users, Search, Handshake, Award, BookOpen, Target, CheckCircle, Clock
}
type IconName = keyof typeof iconMap;

const servicesData: ServicesData = getServices()

const services = servicesData.mainServices.map((service) => {
  const name = (service.icon ?? 'Users') as IconName;
  const IconComponent = iconMap[name] ?? Users;
  return {
    ...service,
    icon: IconComponent,
  };
});

// const services = servicesData.mainServices.map((service: Service) => ({
//   ...service,
//   icon: iconMap[(service.icon ?? 'Users') as keyof typeof iconMap] || Users,
// }))

const additionalServices = servicesData.additionalServices.map((service) => {
  const name = (service.icon ?? 'Users') as IconName;
  const IconComponent = iconMap[name] ?? Users;
  return {
    ...service,
    icon: IconComponent,
  };
});


// const additionalServices = servicesData.additionalServices.map((service: Service) => ({
//   ...service,
//   icon: iconMap[(service.icon ?? 'Users') as keyof typeof iconMap] || Users,
// }))


export default function ServicesPage() {
  const router = useRouter()

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Nossos Serviços"
        title="Excelência em Terapia da Mão"
        description="A Associação disponibiliza apoio técnico, científico e educativo aos seus associados e à comunidade."
        primaryAction={{
          label: "Contactar-nos",
          href: "/contact"
        }}
        secondaryAction={{
          label: "Sobre a APTM",
          href: "/about"
        }}
      />

      {/* Main Services */}
      <section className="py-20 bg-background" id="consulting">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Serviços Principais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluções especializadas desenvolvidas para elevar a padrão da terapia da mão em Portugal
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.id}
                  className="group hover:shadow-lg transition-all duration-300"
                  id={service.href?.slice(1)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      {service.badge && (
                        <Badge variant="secondary">
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl mt-4">{service.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{service.pricing?.type}</span>
                      <span>•</span>
                      <span>{service.pricing?.description}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-6 leading-relaxed">
                      {service.description}
                    </CardDescription>

                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Inclui:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => router.push('/contact')}
                    >
                      Solicitar Informação
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/30" id="additional-services">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Serviços Adicionais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complemente sua prática profissional com nossos serviços especializados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index: number) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {service.description}
                    </CardDescription>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push('/contact')}
                    >
                      Saber Mais
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-background" id="process">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Processo simples e eficiente para aceder aos nossos serviços
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Contacto Inicial',
                description: 'Entre em contacto connosco para discutir suas necessidades e objetivos.',
                icon: Users
              },
              {
                step: 2,
                title: 'Avaliação',
                description: 'Avaliação detalhada das suas necessidades específicas e definição de plano de ação.',
                icon: Search
              },
              {
                step: 3,
                title: 'Implementação',
                description: 'Execução do plano com acompanhamento contínuo e ajustes conforme necessário.',
                icon: Target
              },
              {
                step: 4,
                title: 'Acompanhamento',
                description: 'Suporte contínuo e avaliação de resultados para garantir sucesso.',
                icon: Award
              }
            ].map((item) => {
              const IconComponent = item.icon
              return (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              O Que Dizem Nossos Clientes
            </h2>
            <p className="text-lg text-muted-foreground">
              Experiências reais de profissionais que utilizam nossos serviços
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dra. Carla Martins',
                title: 'Fisioterapeuta',
                content: 'Os serviços da APTM transformaram completamente nossa abordagem clínica. A consultoria especializada foi fundamental para otimizar nossos processos.',
                rating: 5
              },
              {
                name: 'Dr. Pedro Lopes',
                title: 'Diretor Clínico',
                content: 'O programa de formação contínua da APTM é excepcional. Nossa equipa está muito mais preparada e confiante nas intervenções.',
                rating: 5
              },
              {
                name: 'Dra. Ana Rodrigues',
                title: 'Terapeuta Ocupacional',
                content: 'Os recursos e networking proporcionados pela APTM são inestimáveis. Sinto-me parte de uma comunidade verdadeiramente dedicada à excelência.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-primary rounded-full"></div>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    {testimonial.content}
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Pronto para Elevar Sua Prática?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contacto connosco hoje mesmo e descubra como nossos serviços podem
            transformar sua abordagem clínica e profissional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90"
              onClick={() => router.push('/contact')}
            >
              Solicitar Consultoria
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => router.push('/about')}
            >
              Saber Mais
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}