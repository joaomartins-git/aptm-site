'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, Users, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button'

import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

import type { AgendaItem } from '@/types'


/**
  * Returns the badge colour for an agenda item.
 */
function getAgendaItemBadgeVariant(item: AgendaItem) {
  if (item.type === 'training') {
    return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
  }

  switch (item.eventType) {
    case 'webinar':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200'

    case 'seminar':
      return 'bg-green-100 text-green-800 hover:bg-green-200'

    case 'workshop':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-200'

    case 'conference':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200'

    case 'course':
      return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'

    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }
}

/**
 * Returns the human-readable label for an agenda item.
 */
function getAgendaItemTypeName(item: AgendaItem) {
  if (item.type === 'training') {
    return 'Formação'
  }

  switch (item.eventType) {
    case 'webinar':
      return 'Webinar'

    case 'seminar':
      return 'Seminário'

    case 'workshop':
      return 'Workshop'

    case 'conference':
      return 'Conferência'

    case 'course':
      return 'Curso'

    default:
      return 'Evento'
  }
}

/**
 * Returns the appropriate icon for an agenda item.
 */
function getAgendaItemIcon(item: AgendaItem) {
  if (item.type === 'training') {
    return GraduationCap
  }

  switch (item.eventType) {
    case 'webinar':
      return Users

    case 'seminar':
      return Users

    case 'workshop':
      return MapPin

    case 'conference':
      return Calendar

    case 'course':
      return GraduationCap

    default:
      return Calendar
  }
}

// function getInitialSelectedDate(
//   getEventsForDate: (d: Date) => Event[],
//   upcomingEvents: Event[]
// ): Date {
//   const now = new Date();
//   const todayEvents = getEventsForDate(now);

//   if (todayEvents.length > 0) return now;
//   if (upcomingEvents.length > 0) return new Date(upcomingEvents[0].date);

//   return now; // fallback to today
// }

interface HomeCalendarAgendaProps {
  agendaItems: AgendaItem[]
}


export function HomeCalendarAgenda({
  agendaItems,
}: HomeCalendarAgendaProps) {
  
  //const events = getEvents()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date())
  const calendarRef = useRef<HTMLDivElement>(null)

  /**
   * Sort agenda items chronologically.
   */
  const sortedAgendaItems = [...agendaItems].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  )

  /**
   * Only keep agenda items that have not already happened.
   */
  const now = new Date()

  const upcomingAgendaItems = sortedAgendaItems.filter(
    (item) => item.startDate >= now
  )


  /**
   * Get agenda items belonging to a specific calendar date.
   */
  const getAgendaItemsForDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return sortedAgendaItems.filter((item) => {
      const itemDate = item.startDate

      return (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month &&
        itemDate.getDate() === day
      )
    })
  }

  //const [selectedDate, setSelectedDate] = useState<Date>(() => new Date())

  // const [selectedDate, setSelectedDate] = useState<Date>(() => {
  //   const todayEvents = getEventsForDate(now);
  //   if (todayEvents.length > 0) return now;
  //   if (upcomingEvents.length > 0) return new Date(upcomingEvents[0].date);
  //   return now;
  // });

  /**
   * Agenda items belonging to the currently selected date.
   */
  const selectedDateAgendaItems = getAgendaItemsForDate(selectedDate);


  /**
   * Generate all calendar cells for the current month.
   */
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)

    const firstDayOfWeek = firstDay.getDay()

    // Convert Sunday-first JavaScript calendar
    // into Monday-first calendar.
    const adjustedFirstDay =
      firstDayOfWeek === 0
        ? 6
        : firstDayOfWeek - 1

    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()

    const days: (Date | null)[] = []

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Navigation functions
  /**
   * Calendar navigation.
   */
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    )
  }

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    )
  }

  const goToToday = () => {
    const today = new Date()

    setCurrentMonth(today)
    setSelectedDate(today)
  }

  /**
   * Select a calendar date.
   */
  const selectDate = (date: Date) => {
    setSelectedDate(date)
  }

 /**
   * Keyboard navigation for the calendar.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!calendarRef.current) return

      const focusableElements =
        calendarRef.current.querySelectorAll(
          'button[tabindex="0"]'
        )

      const currentIndex = Array.from(
        focusableElements
      ).findIndex(
        (element) => element === document.activeElement
      )

      if (currentIndex === -1) return

      let nextIndex = currentIndex

      switch (event.key) {
        case 'ArrowLeft':
          nextIndex = Math.max(0, currentIndex - 1)
          break

        case 'ArrowRight':
          nextIndex = Math.min(
            focusableElements.length - 1,
            currentIndex + 1
          )
          break

        case 'ArrowUp':
          nextIndex = Math.max(0, currentIndex - 7)
          break

        case 'ArrowDown':
          nextIndex = Math.min(
            focusableElements.length - 1,
            currentIndex + 7
          )
          break

        case 'Enter':
        case ' ':
          event.preventDefault()

          const activeElement =
            focusableElements[
              currentIndex
            ] as HTMLButtonElement

          if (activeElement?.dataset.date) {
            selectDate(
              new Date(activeElement.dataset.date)
            )
          }

          return

        default:
          return
      }

      event.preventDefault()

      const nextElement =
        focusableElements[nextIndex] as HTMLElement

      nextElement?.focus()
    }

    document.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [])

  // Set initial selected date to today or first event
  // useEffect(() => {
  //   if (!selectedDate) {
  //     const todayEvents = getEventsForDate(now)
  //     const next = todayEvents.length > 0 ? now : (upcomingEvents[0] ? new Date(upcomingEvents[0].date) : null);

  //     if (next && selectedDate.getTime() !== next.getTime()) {
  //       setSelectedDate(next)
  //     } else if (upcomingEvents.length > 0) {
  //       setSelectedDate(new Date(upcomingEvents[0].date))
  //     }
  //   }
  // }, [selectedDate, now, upcomingEvents])

  /**
   * Check whether a date contains agenda items.
   */
  const hasAgendaItems = (date: Date) => {
    return getAgendaItemsForDate(date).length > 0
  }

  /**
   * Check whether a date is today.
   */
  const isToday = (date: Date) => {
    const today = new Date()

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    )
  }

  
  /**
   * Check whether a date is selected.
   */
  const isSelected = (date: Date) => {
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    )
  }

  // // Get events for selected date
  // const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  // // Check if a date has events
  // const hasEvents = (date: Date) => {
  //   return getEventsForDate(date).length > 0
  // }


  /**
   * Current month/year label.
   */
  const monthYearLabel =
    currentMonth.toLocaleDateString('pt-PT', {
      month: 'long',
      year: 'numeric',
    })

  const weekDays = [
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
    'Dom',
  ]


   return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Agenda
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navegue pelo nosso calendário e descubra os
            próximos eventos e formações em Terapia da Mão.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">

          {/* ========================= */}
          {/* CALENDAR */}
          {/* ========================= */}

          <div className="order-2 lg:order-1">
            <Card className="p-6">

              <CardHeader className="px-0 pt-0">

                <div className="flex items-center justify-between mb-6">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousMonth}
                    aria-label="Mês anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <h3 className="text-xl font-semibold text-foreground capitalize">
                    {monthYearLabel}
                  </h3>

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

                  {/* Week days */}
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
                        return (
                          <div
                            key={`empty-${index}`}
                            className="aspect-square"
                          />
                        )
                      }

                      const dayAgendaItems =
                        getAgendaItemsForDate(date)

                      const dayHasAgendaItems =
                        hasAgendaItems(date)

                      const dayIsToday =
                        isToday(date)

                      const dayIsSelected =
                        isSelected(date)

                      return (
                        <button
                          key={date.toISOString()}
                          data-date={date.toISOString()}
                          onClick={() =>
                            selectDate(date)
                          }
                          className={cn(
                            'aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',

                            dayIsToday &&
                              'bg-primary text-primary-foreground',

                            dayIsSelected &&
                              !dayIsToday &&
                              'bg-primary/20 text-primary border-2 border-primary',

                            !dayIsToday &&
                              !dayIsSelected &&
                              'hover:bg-muted',

                            dayHasAgendaItems &&
                              !dayIsToday &&
                              !dayIsSelected &&
                              'font-semibold'
                          )}
                          aria-label={`${date.getDate()} de ${currentMonth.toLocaleDateString(
                            'pt-PT',
                            { month: 'long' }
                          )}${
                            dayHasAgendaItems
                              ? ` (${dayAgendaItems.length} itens na agenda)`
                              : ''
                          }`}
                          aria-current={
                            dayIsToday
                              ? 'date'
                              : undefined
                          }
                          aria-selected={
                            dayIsSelected
                              ? 'true'
                              : undefined
                          }
                          tabIndex={
                            dayIsSelected ||
                            dayIsToday
                              ? 0
                              : -1
                          }
                        >

                          <span className="text-sm">
                            {date.getDate()}
                          </span>

                          {dayHasAgendaItems && (
                            <div className="flex gap-1 mt-1">

                              {dayAgendaItems
                                .slice(0, 2)
                                .map((item) => (
                                  <div
                                    key={item.id}
                                    className={cn(
                                      'w-1 h-1 rounded-full',

                                      dayIsToday
                                        ? 'bg-primary-foreground'
                                        : 'bg-primary'
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

                  <div className="flex flex-wrap items-center gap-6 text-sm">

                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-muted-foreground">
                        Hoje
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary/20 border-2 border-primary rounded" />
                      <span className="text-muted-foreground">
                        Selecionado
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-muted-foreground">
                        Com agenda
                      </span>
                    </div>

                  </div>

                </div>

              </CardContent>
            </Card>
          </div>

          {/* ========================= */}
          {/* AGENDA LIST */}
          {/* ========================= */}

          <div className="order-1 lg:order-2">

            <div className="sticky top-8">

              <h3 className="text-center text-2xl font-bold text-foreground mb-6">

                Agenda de{' '}

                {selectedDate.toLocaleDateString(
                  'pt-PT',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }
                )}

              </h3>

              {selectedDateAgendaItems.length > 0 ? (

                <div className="space-y-4">

                  {selectedDateAgendaItems.map(
                    (item) => {

                      const IconComponent =
                        getAgendaItemIcon(item)

                      return (
                        <Card
                          key={item.id}
                          className="hover:shadow-md transition-all duration-200"
                        >

                          <CardHeader className="pb-3">

                            <div className="flex items-start justify-between gap-4">

                              <div className="flex-1">

                                <CardTitle className="text-lg mb-2">
                                  {item.title}
                                </CardTitle>

                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">

                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                      {formatDate(
                                        item.startDate
                                      )}
                                    </span>
                                  </div>

                                  {item.speaker && (
                                    <div className="flex items-center gap-1">
                                      <Users className="w-4 h-4" />
                                      <span>
                                        {item.speaker}
                                      </span>
                                    </div>
                                  )}

                                  {item.instructor && (
                                    <div className="flex items-center gap-1">
                                      <GraduationCap className="w-4 h-4" />
                                      <span>
                                        {item.instructor}
                                      </span>
                                    </div>
                                  )}

                                  {item.duration && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      <span>
                                        {item.duration}
                                      </span>
                                    </div>
                                  )}

                                  {item.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>
                                        {item.location}
                                      </span>
                                    </div>
                                  )}

                                </div>

                              </div>

                              <Badge
                                className={getAgendaItemBadgeVariant(
                                  item
                                )}
                              >
                                {getAgendaItemTypeName(
                                  item
                                )}
                              </Badge>

                            </div>

                          </CardHeader>

                          <CardContent className="pt-0">

                            <CardDescription className="text-sm leading-relaxed mb-4">
                              {item.description}
                            </CardDescription>

                            <div className="flex items-center justify-between">

                              <div className="flex flex-wrap gap-2">

                                {item.level && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {item.level}
                                  </Badge>
                                )}

                                {item.price && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {item.price}
                                  </Badge>
                                )}

                              </div>

                              <Link
                                href={item.href}
                              >
                                <Button size="sm">
                                  Ver Detalhes
                                </Button>
                              </Link>

                            </div>

                          </CardContent>

                        </Card>
                      )
                    }
                  )}

                </div>

              ) : (

                <div className="text-center py-12">

                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-slate-400" />
                  </div>

                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Sem eventos ou formações neste dia
                  </h4>

                  <p className="text-muted-foreground mb-6">
                    Não há atividades agendadas para{' '}
                    {selectedDate.toLocaleDateString(
                      'pt-PT',
                      {
                        day: 'numeric',
                        month: 'long',
                      }
                    )}
                    .
                  </p>

                </div>

              )}

              {/* View all */}
              <div className="mt-8 text-center">

                <Link href="/events">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
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
