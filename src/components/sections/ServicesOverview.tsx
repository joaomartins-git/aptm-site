'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Users,
  Search,
  Handshake,
  Award,
  BookOpen,
  Clock
} from 'lucide-react'

const services = [
  {
    id: 'consulting',
    icon: Users,
    title: 'Consultoria Especializada',
    description: 'Serviços de consultoria para profissionais e instituições de saúde, com foco em terapia da mão e reabilitação.',
    features: [
      'Avaliação funcional',
      'Planos de tratamento personalizados',
      'Otimização de processos clínicos',
      'Formação contínua'
    ],
    href: '/services#consulting',
    badge: 'Popular'
  },
  {
    id: 'research',
    icon: Search,
    title: 'Investigação e Desenvolvimento',
    description: 'Projetos de investigação e desenvolvimento de novas técnicas e metodologias em terapia da mão.',
    features: [
      'Estudos clínicos',
      'Publicações científicas',
      'Colaborações internacionais',
      'Inovação tecnológica'
    ],
    href: '/services#research',
    badge: null
  },
  {
    id: 'partnerships',
    icon: Handshake,
    title: 'Programas de Parceria',
    description: 'Estabelecimento de parcerias estratégicas com instituições de saúde e universidades.',
    features: [
      'Rede de profissionais',
      'Intercâmbio de conhecimento',
      'Projetos colaborativos',
      'Eventos conjuntos'
    ],
    href: '/services#partnerships',
    badge: null
  },
  {
    id: 'member-benefits',
    icon: Award,
    title: 'Benefícios para Membros',
    description: 'Acesso exclusivo a recursos, formações, eventos e networking profissional.',
    features: [
      'Descontos em formações',
      'Acesso a publicações',
      'Networking profissional',
      'Certificação APTM'
    ],
    href: '/services#member-benefits',
    badge: 'Exclusivo'
  }
]

export function ServicesOverview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Os Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma vasta gama de serviços para profissionais e instituições
            de saúde, promovendo excelência na terapia da mão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  {service.badge && (
                    <Badge variant="secondary" className="w-fit mx-auto mb-2">
                      {service.badge}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-6">
                    {service.description}
                  </CardDescription>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center text-sm text-muted-foreground"
                      >
                        <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Link href={service.href}>
                      Saber Mais
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/services">
              Ver Todos os Serviços
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}