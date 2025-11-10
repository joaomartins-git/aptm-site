'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getEvents } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
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
 * Get event type display name
 */
function getEventTypeName(eventType: Event['type']) {
  switch (eventType) {
    case 'webinar':
      return 'Webinar'
    case 'seminar':
      return 'Seminário'
    case 'workshop':
      return 'Workshop'
    case 'conference':
      return 'Conferência'
    default:
      return 'Evento'
  }
}

export function HomeCalendarAgenda() {
  const events = getEvents()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Filter out past events
  const now = new Date()
  const upcomingEvents = sortedEvents.filter(event =>
    new Date(event.date) >= now
  )

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return sortedEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toISOString().split('T')[0] === dateStr
    })
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1)
    const firstDayOfWeek = firstDay.getDay()

    // Adjust for Monday-first week (0 = Monday, 6 = Sunday)
    const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    // Last day of month
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Generate days array
    const days = []

    // Add empty cells for days before month starts
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    setSelectedDate(today)
  }

  // Handle date selection
  const selectDate = (date: Date) => {
    setSelectedDate(date)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!calendarRef.current) return

      const focusableElements = calendarRef.current.querySelectorAll('button[tabindex="0"]')
      const currentIndex = Array.from(focusableElements).findIndex(el => el === document.activeElement)

      if (currentIndex === -1) return

      let nextIndex = currentIndex

      switch (event.key) {
        case 'ArrowLeft':
          nextIndex = Math.max(0, currentIndex - 1)
          break
        case 'ArrowRight':
          nextIndex = Math.min(focusableElements.length - 1, currentIndex + 1)
          break
        case 'ArrowUp':
          nextIndex = Math.max(0, currentIndex - 7)
          break
        case 'ArrowDown':
          nextIndex = Math.min(focusableElements.length - 1, currentIndex + 7)
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          const activeElement = focusableElements[currentIndex] as HTMLButtonElement
          if (activeElement && activeElement.dataset.date) {
            selectDate(new Date(activeElement.dataset.date))
          }
          return
        default:
          return
      }

      event.preventDefault()
      ;(focusableElements[nextIndex] as HTMLElement).focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Set initial selected date to today or first event
  useEffect(() => {
    if (!selectedDate) {
      const todayEvents = getEventsForDate(now)
      if (todayEvents.length > 0) {
        setSelectedDate(now)
      } else if (upcomingEvents.length > 0) {
        setSelectedDate(new Date(upcomingEvents[0].date))
      }
    }
  }, [selectedDate, now, upcomingEvents])

  // Get events for selected date
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  // Check if a date has events
  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0
  }

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Check if a date is selected
  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  // Month and year display
  const monthYearLabel = currentMonth.toLocaleDateString('pt-PT', {
    month: 'long',
    year: 'numeric'
  })

  // Week days (Monday to Sunday in Portuguese)
  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

  if (upcomingEvents.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container">
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
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Calendário de Eventos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navegue pelo nosso calendário e descubra os próximos eventos, workshops e formações em terapia da mão.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Calendar */}
          <div className="order-2 lg:order-1">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                {/* Calendar Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousMonth}
                    aria-label="Mês anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-foreground capitalize">
                      {monthYearLabel}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToToday}
                      className="text-sm"
                    >
                      Hoje
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextMonth}
                      aria-label="Próximo mês"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-0 pb-0">
                <div
                  ref={calendarRef}
                  role="grid"
                  aria-label={`Calendário de ${monthYearLabel}`}
                  className="space-y-2"
                >
                  {/* Week day headers */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {weekDays.map((day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-muted-foreground py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                      if (!date) {
                        return <div key={`empty-${index}`} className="aspect-square" />
                      }

                      const dayEvents = getEventsForDate(date)
                      const dayHasEvents = dayEvents.length > 0
                      const dayIsToday = isToday(date)
                      const dayIsSelected = isSelected(date)

                      return (
                        <button
                          key={date.toISOString()}
                          data-date={date.toISOString()}
                          onClick={() => selectDate(date)}
                          className={cn(
                            'aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                            dayIsToday && 'bg-primary text-primary-foreground',
                            dayIsSelected && !dayIsToday && 'bg-primary/20 text-primary border-2 border-primary',
                            !dayIsToday && !dayIsSelected && 'hover:bg-muted',
                            dayHasEvents && !dayIsToday && !dayIsSelected && 'font-semibold'
                          )}
                          aria-label={`${date.getDate()} de ${currentMonth.toLocaleDateString('pt-PT', { month: 'long' })}${dayHasEvents ? ` (${dayEvents.length} eventos)` : ''}`}
                          aria-current={isToday(date) ? 'date' : undefined}
                          aria-selected={dayIsSelected ? 'true' : undefined}
                          tabIndex={dayIsSelected ? 0 : -1}
                          tabIndex={dayIsToday ? 0 : -1}
                        >
                          <span className="text-sm">{date.getDate()}</span>
                          {dayHasEvents && (
                            <div className="flex gap-1 mt-1">
                              {dayEvents.slice(0, 2).map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    'w-1 h-1 rounded-full',
                                    dayIsToday ? 'bg-primary-foreground' : 'bg-primary'
                                  )}
                                />
                              ))}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-muted-foreground">Hoje</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary/20 border-2 border-primary rounded" />
                      <span className="text-muted-foreground">Selecionado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-muted-foreground">Com eventos</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {selectedDate
                  ? `Eventos de ${selectedDate.toLocaleDateString('pt-PT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}`
                  : 'Próximos Eventos'}
              </h3>

              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              {event.speaker && (
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{event.speaker}</span>
                                </div>
                              )}
                              {event.duration && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{event.duration}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge
                            className={getEventTypeBadgeVariant(event.type)}
                          >
                            {getEventTypeName(event.type)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-sm leading-relaxed mb-4">
                          {event.description}
                        </CardDescription>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {event.level && (
                              <Badge variant="secondary" className="text-xs">
                                {event.level}
                              </Badge>
                            )}
                            {event.price && (
                              <Badge variant="outline" className="text-xs">
                                {event.price}
                              </Badge>
                            )}
                          </div>

                          <Link href={`/events/${event.id}`}>
                            <Button size="sm">
                              Ver Detalhes
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : selectedDate ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Sem eventos neste dia
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Não há eventos agendados para {selectedDate.toLocaleDateString('pt-PT', {
                      day: 'numeric',
                      month: 'long'
                    })}.
                  </p>
                  <Link href="/events">
                    <Button variant="outline">
                      Ver Todos os Eventos
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 5).map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              {event.speaker && (
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{event.speaker}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge
                            className={getEventTypeBadgeVariant(event.type)}
                          >
                            {getEventTypeName(event.type)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Link href={`/events/${event.id}`}>
                          <Button size="sm">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* View All Events Link */}
              <div className="mt-8 text-center">
                <Link href="/events">
                  <Button variant="outline" className="w-full">
                    Ver Todos os Eventos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
