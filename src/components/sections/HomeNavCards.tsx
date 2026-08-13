'use client'

import React from 'react'
import Link from 'next/link'
import {
  Calendar,
  GraduationCap,
  Hand,
  Mail
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface NavCard {
  id: string
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navCards: NavCard[] = [
  {
    id: 'events',
    title: 'Eventos',
    description: 'Acompanhe nossa agenda e participe dos próximos eventos científicos',
    href: '/events',
    icon: Calendar
  },
  {
    id: 'trainings',
    title: 'Formações',
    description: 'Consulte o calendário de formações e invista na sua atualização profissional',
    href: '/trainings',
    icon: GraduationCap
  },
  {
    id: 'services',
    title: 'Atividades',
    description: 'O nosso compromisso é promover a excelência no cuidado e na reeducação, fortalecendo o papel transformador da Terapia da Mão na vida das pessoas (Em Manutenção)',
    href: '',
    icon: Hand
  },
  {
    id: 'contact',
    title: 'Contacto',
    description: 'Entre em contacto connosco',
    href: '/contact',
    icon: Mail
  }
]

export function HomeNavCards() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tudo o que a APTM tem para oferecer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra os nossos eventos, formações e serviços e como podemos potenciar o seu desenvolvimento profissional.
          </p>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {navCards.map((card) => {
            const IconComponent = card.icon
            return (
              <Link
                key={card.id}
                href={card.href}
                className={cn(
                  "group block transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                )}
              >
                <Card className={cn(
                  "h-full py-3 border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300",
                  "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                )}>
                  <CardHeader className="text-center pb-4">
                    <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-base leading-relaxed">
                      {card.description}
                    </CardDescription>
                    <div className="mt-6 flex justify-center">
                      <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Saber mais
                        <span>→</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}