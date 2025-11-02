import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Users, Award, BookOpen } from 'lucide-react'

const ctaFeatures = [
  {
    icon: Users,
    title: 'Comunidade Ativa',
    description: 'Junte-se a mais de 500 profissionais especializados'
  },
  {
    icon: Award,
    title: 'Certificação',
    description: 'Obtenha certificação reconhecida nacionalmente'
  },
  {
    icon: BookOpen,
    title: 'Formação Contínua',
    description: 'Acesso a workshops e eventos exclusivos'
  }
]

export function CallToAction() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Junte-se à Comunidade APTM
          </h2>

          <p className="text-xl mb-12 text-primary-foreground/90 max-w-2xl mx-auto">
            Faça parte da principal associação de terapia da mão em Portugal e
            aceda a recursos exclusivos, formação contínua e uma rede de profissionais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {ctaFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90 w-full sm:w-auto"
            >
              <Link href="/about" className="flex items-center">
                Saber Mais Sobre a APTM
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto"
            >
              <Link href="/contact">
                Contactar-nos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}