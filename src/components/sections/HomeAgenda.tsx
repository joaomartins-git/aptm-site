'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button'
import { getEvents } from '@/lib/content'
import { formatDate, truncateText } from '@/lib/utils'
import type { Event } from '@/types/index'

/**
 * Get event type styling for badges
 */
function getEventTypeBadgeVariant(eventType: Event['type']) {
  switch (eventType) {
    case 'webinar':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    case 'seminar':
      return 'bg-green-100 text-green-800 hover:bg-green-200'
    case 'workshop':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-200'
    case 'conference':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }
}

/**
 * Compact date badge component for agenda list
 */
function DateBadge({ date }: { date: string }) {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.toLocaleDateString('pt-PT', { month: 'short' })

  return (
    <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full text-center">
      <span className="text-sm font-bold leading-none">{day}</span>
      <span className="text-xs leading-none">{month}</span>
    </div>
  )
}

export function HomeAgenda() {
  const events = getEvents()

  // Sort events by date (upcoming first)
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Filter out past events
  const now = new Date()
  const upcomingEvents = sortedEvents.filter(event =>
    new Date(event.date) >= now
  )

  // Get next featured event and remaining events for agenda list
  const featuredEvent = upcomingEvents[0]
  const agendaEvents = upcomingEvents.slice(1, 6) // Next 5 events (excluding featured)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Agenda APTM
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mantenha-se atualizado com os próximos eventos, workshops e formações em terapia da mão.
          </p>
        </div>

        {upcomingEvents.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Não há eventos agendados neste momento
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Estamos sempre a preparar novos eventos e formações. Volte a visitar-nos em breve para novidades.
            </p>
            <Link href="/events">
              <Button size="lg">
                Ver Todos os Eventos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Featured Event (60% on desktop) */}
            <div className="lg:col-span-2">
              {featuredEvent && (
                <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Event Image */}
                  {featuredEvent.image && (
                    <div className="relative h-64 sm:h-80">
                      <Image
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                      {/* Event Type Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={getEventTypeBadgeVariant(featuredEvent.type)}
                        >
                          {featuredEvent.type === 'webinar' && 'Webinar'}
                          {featuredEvent.type === 'seminar' && 'Seminário'}
                          {featuredEvent.type === 'workshop' && 'Workshop'}
                          {featuredEvent.type === 'conference' && 'Conferência'}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
                          {featuredEvent.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(featuredEvent.date)}</span>
                          </div>
                          {featuredEvent.speaker && (
                            <div className="flex items-center gap-1">
                              <span>•</span>
                              <span>{featuredEvent.speaker}</span>
                            </div>
                          )}
                          {featuredEvent.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{featuredEvent.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="text-base leading-relaxed mb-6">
                      {truncateText(featuredEvent.description, 150)}
                    </CardDescription>

                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {featuredEvent.level && (
                          <Badge variant="secondary">
                            {featuredEvent.level}
                          </Badge>
                        )}
                        {featuredEvent.price && (
                          <Badge variant="outline">
                            {featuredEvent.price}
                          </Badge>
                        )}
                      </div>

                      <Link href={`/events/${featuredEvent.id}`}>
                        <Button>
                          Detalhes do Evento
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Agenda List (40% on desktop) */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Próximos Eventos
                </h3>

                {agendaEvents.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Mais eventos em breve
                  </p>
                ) : (
                  <div className="space-y-4">
                    {agendaEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className="block group"
                      >
                        <div className="bg-white rounded-lg p-4 border border-slate-200 hover:border-primary hover:shadow-sm transition-all duration-200">
                          <div className="flex gap-3">
                            <DateBadge date={event.date} />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                {event.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge
                                  className={getEventTypeBadgeVariant(event.type)}
                                  variant="secondary"
                                >
                                  {event.type === 'webinar' && 'Webinar'}
                                  {event.type === 'seminar' && 'Seminário'}
                                  {event.type === 'workshop' && 'Workshop'}
                                  {event.type === 'conference' && 'Conferência'}
                                </Badge>
                                <span>•</span>
                                <span>{formatDate(event.date)}</span>
                              </div>
                              {event.speaker && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                  {event.speaker}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {events.length > agendaEvents.length + 1 && (
                  <div className="mt-6 text-center">
                    <Link href="/events">
                      <Button variant="outline" size="sm">
                        Ver Todos os Eventos
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
