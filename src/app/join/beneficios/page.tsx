import React from 'react'
import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { CheckCircle, GraduationCap, Users, Calendar, BookOpen, Award, MessageCircle, Briefcase } from 'lucide-react'

const benefits = [
  {
    title: 'Descontos em Eventos e Formações',
    description: 'Acesso a preços reduzidos em todos os eventos, workshops e cursos organizados pela APTM.',
    icon: Calendar
  },
  {
    title: 'Acesso a Recursos Exclusivos',
    description: 'Biblioteca digital com artigos científicos, vídeos educativos e materiais de estudo atualizados.',
    icon: BookOpen
  },
  {
    title: 'Prioridade nas Inscrições',
    description: 'Liberdade de inscrição antecipada em eventos com capacidade limitada.',
    icon: Users
  },
  {
    title: 'Formação Contínua',
    description: 'Programas de formação contínua com certificação reconhecida para desenvolvimento profissional.',
    icon: GraduationCap
  },
  {
    title: 'Certificação APTM',
    description: 'Possibilidade de obter certificação profissional e reconhecimento como especialista em terapia da mão.',
    icon: Award
  },
  {
    title: 'Rede Profissional',
    description: 'Acesso a uma comunidade de especialistas para partilha de experiências e colaboração.',
    icon: MessageCircle
  },
  {
    title: 'Oportunidades de Carreira',
    description: 'Acesso a ofertas de emprego exclusivas e oportunidades de desenvolvimento profissional.',
    icon: Briefcase
  },
  {
    title: 'Representação Institucional',
    description: 'Defesa dos interesses profissionais e representação junto de entidades governamentais e internacionais.',
    icon: CheckCircle
  }
]

export default function BeneficiosPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Vantagens de Associado"
        title="Benefícios APTM"
        description="Descubra todas as vantagens de ser membro da Associação Portuguesa de Terapeutas da Mão e aceda a oportunidades únicas para o seu desenvolvimento profissional."
      />

      {/* Benefits Content */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Por que se Tornar Sócio da APTM?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Como membro da APTM, faz parte de uma comunidade dinâmica de profissionais dedicados
                à excelência na terapia da mão, com acesso a benefícios exclusivos que impulsionam a sua
                carreira e desenvolvimento profissional.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Additional Information */}
            <div className="text-center">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Junte-se à Nossa Comunidade</CardTitle>
                  <CardDescription className="text-lg">
                    Faça parte da principal associação de terapia da mão em Portugal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    A APTM representa centenas de profissionais dedicados à excelência na terapia da mão.
                    Junte-se a nós e aceda a uma rede de apoio, formação contínua e oportunidades únicas
                    para o seu crescimento profissional.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">500+</div>
                      <div className="text-muted-foreground">Membros Ativos</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">15+</div>
                      <div className="text-muted-foreground">Anos de Experiência</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">50+</div>
                      <div className="text-muted-foreground">Eventos por Ano</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}