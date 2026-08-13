'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function EventsOverview() {
  const router = useRouter()

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Eventos
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Consulte os próximos eventos e oportunidades de aprendizagem
            da APTM.
          </p>

          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push('/events')}
          >
            Ver Todos os Eventos
          </Button>
        </div>
      </div>
    </section>
  )
}