'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Video, Users, MapPin, Calendar, Clock, Search, Star, Bell } from 'lucide-react'
import eventsData from '../../../data/events.json'

const upcomingEvents = eventsData.upcomingEvents

const eventTypeInfo = {
  webinar: {
    label: 'Webinar',
    icon: Video,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Sessões online interativas ao vivo'
  },
  seminar: {
    label: 'Seminário',
    icon: Users,
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Apresentações especializadas e discussões'
  },
  workshop: {
    label: 'Workshop',
    icon: MapPin,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Sessões práticas e aprendizado hands-on'
  },
  conference: {
    label: 'Congresso',
    icon: Users,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Grandes eventos com múltiplos especialistas'
  }
}

const levelInfo = {
  'Básico': 'Ideal para estudantes e profissionais iniciantes',
  'Intermediário': 'Requer conhecimentos básicos prévios',
  'Avançado': 'Dirigido a profissionais experientes',
  'Todos os níveis': 'Acessível a todos os profissionais'
}

export default function EventsPage() {
  const router = useRouter()

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Eventos"
        title="Aprendizagem e Desenvolvimento Contínuo"
        description="Participe nos nossos eventos, webinars e workshops para manter-se atualizado com as mais recentes developões e melhores práticas em terapia da mão."
        primaryAction={{
          label: "Inscrever-se em Eventos",
          href: "/contact"
        }}
        secondaryAction={{
          label: "Calendário Completo",
          href: "#upcoming-events"
        }}
      />

      {/* Event Types Overview */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Tipos de Eventos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos diversos formatos de eventos para atender diferentes necessidades de aprendizagem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(eventTypeInfo).map(([type, info]) => {
              const IconComponent = info.icon
              return (
                <Card key={type} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`${info.color} border mx-auto w-fit`}
                    >
                      {info.label}
                    </Badge>
                    <CardTitle className="text-lg mt-2">
                      {info.label}s
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {info.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Encontrar Eventos
              </h2>
              <p className="text-lg text-muted-foreground">
                Pesquise eventos por tipo, nível ou data
              </p>
            </div>

            <div className="bg-background rounded-lg p-8 shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Pesquisar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar eventos..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tipo de Evento</label>
                  <select className="w-full px-3 py-2 border border-input bg-background text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Todos os tipos</option>
                    {Object.entries(eventTypeInfo).map(([type, info]) => (
                      <option key={type} value={type}>{info.label}s</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nível</label>
                  <select className="w-full px-3 py-2 border border-input bg-background text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Todos os níveis</option>
                    {Object.keys(levelInfo).map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button className="w-full md:w-auto">
                Buscar Eventos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background" id="upcoming-events">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Próximos Eventos
            </h2>
            <p className="text-lg text-muted-foreground">
              Não perca nossos próximos eventos e oportunidades de aprendizagem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {upcomingEvents.map((event) => {
              const typeInfo = eventTypeInfo[event.type as keyof typeof eventTypeInfo]
              const IconComponent = typeInfo.icon

              return (
                <Card
                  key={event.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <IconComponent className="h-16 w-16 text-primary/50" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="outline"
                        className={`${typeInfo.color} border`}
                      >
                        <IconComponent className="h-3 w-3 mr-1" />
                        {typeInfo.label}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('pt-PT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.duration}
                    </div>
                    <CardTitle className="text-xl mb-2 line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {event.speaker}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="mb-4 line-clamp-3">
                      {event.description}
                    </CardDescription>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-primary">
                        {event.price}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {event.level}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground mb-4">
                      {levelInfo[event.level as keyof typeof levelInfo]}
                    </div>

                    <Button
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      disabled={event.isPlaceholder}
                      onClick={() => !event.isPlaceholder && router.push(`/events/${event.id}`)}
                    >
                      {event.isPlaceholder ? 'Em Breve' : 'Inscrever-se'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              Ver Calendário Completo
            </Button>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center bg-background rounded-2xl p-8 md:p-12 shadow-sm border">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Sistema de Eventos em Desenvolvimento
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Estamos trabalhando para lançar uma plataforma completa de eventos com inscrições online,
              certificados automáticos, gravações de webinars e muito mais. Fique atento às novidades!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push('/contact')}>
                Receber Notificações
              </Button>
              <Button variant="outline" onClick={() => router.push('/contact')}>
                Sugerir Tema para Evento
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Bell className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Mantenha-se Informado
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscreva a nossa newsletter para receber informações sobre próximos eventos,
              palestrantes confirmados e vagas disponíveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="O seu email"
                className="flex-1"
              />
              <Button>
                Subscrever
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}