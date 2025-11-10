'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Calendar, MapPin, Video, Users } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Event } from '@/types/index'

const upcomingEvents: Event[] = [
  {
    id: 'webinar-1',
    title: 'Novas Técnicas em Reabilitação da Mão',
    date: '2024-12-15T14:00:00Z',
    type: 'webinar',
    description: 'Webinar sobre as mais recentes técnicas e abordagens em reabilitação da mão.',
    isPlaceholder: true
  },
  {
    id: 'seminar-1',
    title: 'Seminário Internacional de Terapia da Mão',
    date: '2025-01-20T09:00:00Z',
    type: 'seminar',
    description: 'Seminário com especialistas internacionais sobre inovações em terapia da mão.',
    isPlaceholder: true
  },
  {
    id: 'workshop-1',
    title: 'Workshop Prático de Avaliação Funcional',
    date: '2025-02-10T09:00:00Z',
    type: 'workshop',
    description: 'Workshop prático focado em técnicas de avaliação funcional da mão.',
    isPlaceholder: true
  },
    {
    id: 'conference-1',
    title: 'Conferência Anual de Terapia da Mão',
    date: '2025-02-16T09:00:00Z',
    type: 'conference',
    description: 'Conferência com especialistas internacionais sobre as mais recentes técnicas e abordagens em reabilitação da mão.',
    isPlaceholder: true
  }
]

const eventTypeInfo = {
  webinar: {
    label: 'Webinar',
    icon: Video,
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  seminar: {
    label: 'Seminário',
    icon: Users,
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  workshop: {
    label: 'Workshop',
    icon: MapPin,
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  conference: {
    label: 'Conferência',
    icon: Calendar,
    color: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
  }
}

export function EventsOverview() {
  const router = useRouter()

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Próximos Eventos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Participe nos nossos eventos e mantenha-se atualizado com as mais recentes
            developões em terapia da mão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event) => {
            const typeInfo = eventTypeInfo[event.type]
            const IconComponent = typeInfo.icon

            return (
              <Card
                key={event.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="outline"
                      className={`${typeInfo.color} border`}
                    >
                      <IconComponent className="h-3 w-3 mr-1" />
                      {typeInfo.label}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl mb-2 line-clamp-2">
                    {event.title}
                  </CardTitle>

                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="mb-6 line-clamp-3">
                    {event.description}
                  </CardDescription>

                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    {event.type === 'webinar' ? (
                      <Video className="h-4 w-4 mr-2" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2" />
                    )}
                    {event.type === 'webinar' ? 'Online' : 'Localização a definir'}
                  </div>

                  <Button
                    variant="outline"
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
          <Button size="lg" variant="outline" onClick={() => router.push('/events')}>
            Ver Todos os Eventos
          </Button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 text-center bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Mantenha-se Informado
            </h3>
            <p className="text-muted-foreground mb-8">
              Subscreva a nossa newsletter para receber notificações sobre próximos
              eventos, formações e novidades da APTM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="O seu email"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <Button className="px-6 py-3">
                Subscrever
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
