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
    description: 'Próximos eventos e workshops especializados',
    href: '/events',
    icon: Calendar
  },
  {
    id: 'trainings',
    title: 'Formações',
    description: 'Cursos e certificações profissionais',
    href: '/trainings',
    icon: GraduationCap
  },
  {
    id: 'services',
    title: 'Serviços',
    description: 'Terapia da mão e membro superior',
    href: '/services',
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Explorar APTM
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra os nossos serviços, eventos, formações e como podemos ajudar no seu desenvolvimento profissional.
          </p>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {navCards.map((card) => {
            const IconComponent = card.icon
            return (
              <Link
                key={card.id}
                href={card.href}
                className={cn(
                  "group block transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                )}
              >
                <Card className={cn(
                  "h-full border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300",
                  "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                )}>
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl group-hover:text-primary transition-colors">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-base leading-relaxed">
                      {card.description}
                    </CardDescription>
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