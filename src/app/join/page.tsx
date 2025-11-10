'use client'

import React from 'react'
import Link from 'next/link'
import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Users, Award, Clock, MessageCircle } from 'lucide-react'

const benefits = [
  {
    title: 'Formação Contínua',
    description: 'Acesso exclusivo a cursos, workshops e eventos de formação contínua',
    icon: Users
  },
  {
    title: 'Certificação APTM',
    description: 'Obtenha reconhecimento profissional através da nossa certificação',
    icon: Award
  },
  {
    title: 'Recursos Educacionais',
    description: 'Biblioteca completa de artigos, vídeos e materiais de estudo',
    icon: Clock
  },
  {
    title: 'Comunidade Profissional',
    description: 'Conecte-se com especialistas e partilhe experiências',
    icon: MessageCircle
  }
]

export default function JoinPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Tornar-se Membro"
        title="Em breve"
        description="Estamos a preparar uma nova plataforma de adesão com benefícios exclusivos e processo simplificado. Junte-se à comunidade líder em terapia da mão."
        primaryAction={{
          label: "Contactar",
          href: "/contact"
        }}
      />

      {/* Information Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Por que se Tornar Membro da APTM?
              </h2>
              <p className="text-lg text-muted-foreground">
                Descubra os benefícios de fazer parte da principal associação de terapia da mão em Portugal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Coming Soon Card */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Novo Sistema de Adesão</CardTitle>
                <CardDescription className="text-lg">
                  Estamos a desenvolver uma plataforma completa para facilitar o seu processo de adesão
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Enquanto finalizamos o nosso novo sistema de inscrição online,
                  pode obter mais informações sobre membros através do nosso contacto.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="w-full sm:w-auto">
                      Contactar para Informações
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Junte-se a Nós
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A APTM representa centenas de profissionais dedicados à excelência na terapia da mão.
              Faça parte desta comunidade e avance a sua carreira profissional.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Membros Ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Anos de Experiência</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Eventos por Ano</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}