'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Heart, Target, Award, Users, Calendar, MapPin } from 'lucide-react'

const teamMembers = [
  {
    id: '1',
    name: 'Dra. Ana Silva',
    title: 'Presidente da APTM',
    bio: 'Especialista em terapia da mão com mais de 20 anos de experiência. Líder na investigação e desenvolvimento de novas técnicas de reabilitação.',
    image: '/images/team/ana-silva.jpg'
  },
  {
    id: '2',
    name: 'Dr. João Santos',
    title: 'Vice-Presidente',
    bio: 'Fisioterapeuta especializado em reabilitação de membros superiores. Coordenador de programas de formação e certificação.',
    image: '/images/team/joao-santos.jpg'
  },
  {
    id: '3',
    name: 'Dra. Maria Costa',
    title: 'Secretária Geral',
    bio: 'Terapeuta ocupacional com foco em reabilitação funcional da mão. Responsável pela organização de eventos e workshops.',
    image: '/images/team/maria-costa.jpg'
  },
  {
    id: '4',
    name: 'Dr. Pedro Ferreira',
    title: 'Tesoureiro',
    bio: 'Especialista em gestão de associações profissionais. Foco em desenvolvimento de parcerias estratégicas e internacionais.',
    image: '/images/team/pedro-ferreira.jpg'
  }
]

const milestones = [
  {
    year: '2009',
    title: 'Fundação da APTM',
    description: 'Criação da Associação Portuguesa de Terapia da Mão com um grupo pioneiro de 25 profissionais.'
  },
  {
    year: '2012',
    title: 'Primeiro Congresso Nacional',
    description: 'Organização do primeiro congresso nacional dedicado exclusivamente à terapia da mão em Portugal.'
  },
  {
    year: '2015',
    title: 'Reconhecimento Internacional',
    description: 'Afiliação à International Federation of Societies for Hand Therapy (IFSHT).'
  },
  {
    year: '2018',
    title: 'Programa de Certificação',
    description: 'Lançamento do programa nacional de certificação para terapeutas da mão.'
  },
  {
    year: '2021',
    title: 'Expansão Digital',
    description: 'Implementação de plataforma de formação online e recursos educacionais digitais.'
  },
  {
    year: '2024',
    title: '500+ Membros',
    description: 'Alcance de mais de 500 membros ativos em todo o território nacional.'
  }
]

const statistics = [
  {
    number: '500+',
    label: 'Membros Ativos',
    icon: Users
  },
  {
    number: '15+',
    label: 'Anos de Experiência',
    icon: Calendar
  },
  {
    number: '50+',
    label: 'Eventos Anuais',
    icon: MapPin
  },
  {
    number: '1000+',
    label: 'Profissionais Formados',
    icon: Award
  }
]

export default function AboutPage() {
  const router = useRouter()

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Sobre Nós"
        title="Conheça a APTM"
        description="Líderes em excelência e desenvolvimento da terapia da mão em Portugal, promovendo educação, investigação e colaboração profissional."
        primaryAction={{
          label: "Tornar-se Membro",
          href: "/contact"
        }}
        secondaryAction={{
          label: "Contactar-nos",
          href: "/contact"
        }}
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-background" id="mission">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Promover a excelência no tratamento da mão e membro superior através de educação
                contínua, investigação científica e prática baseada em evidências. Representamos e
                apoiamos os profissionais de terapia da mão em Portugal.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Excelência Profissional</h4>
                    <p className="text-muted-foreground text-sm">
                      Estabelecimento dos mais altos padrões de prática clínica
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Educação Contínua</h4>
                    <p className="text-muted-foreground text-sm">
                      Formação e desenvolvimento profissional permanente
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Comunidade</h4>
                    <p className="text-muted-foreground text-sm">
                      Rede colaborativa de profissionais especializados
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Nossa Visão
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Ser a referência nacional e internacional em terapia da mão,
                reconhecida pela qualidade, inovação e impacto dos nossos profissionais
                na saúde e bem-estar dos pacientes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Reconhecimento</h4>
                    <p className="text-muted-foreground text-sm">
                      Referência nacional e internacional na área
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Inovação</h4>
                    <p className="text-muted-foreground text-sm">
                      Desenvolvimento constante de novas técnicas e abordagens
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Impacto</h4>
                    <p className="text-muted-foreground text-sm">
                      Melhoria significativa na qualidade de vida dos pacientes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Os Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Excelência</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Compromisso com os mais altos padrões de qualidade e prática profissional
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Integridade</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Ética profissional e transparência em todas as nossas ações e decisões
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Colaboração</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Trabalho em equipe e partilha de conhecimento para o benefício de todos
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Inovação</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Abertura a novas ideias e desenvolvimento contínuo de práticas avançadas
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              APTM em Números
            </h2>
            <p className="text-lg text-muted-foreground">
              O nosso crescimento e impacto ao longo dos anos
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background" id="team">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Nossa Equipa
            </h2>
            <p className="text-lg text-muted-foreground">
              Conheça os profissionais que lideram a APTM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teamMembers.map((member) => (
              <Card key={member.id} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {member.title}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {member.bio}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => router.push('/contact')}>
              Contactar a Equipa
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Nossa História
            </h2>
            <p className="text-lg text-muted-foreground">
              Principais marcos na nossa jornada de excelência
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-8 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left ml-auto'}`}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-primary border-primary">
                            {milestone.year}
                          </Badge>
                          {index % 2 === 0 ? (
                            <div className="w-4 h-4 bg-primary rounded-full absolute right-0 transform translate-x-8"></div>
                          ) : (
                            <div className="w-4 h-4 bg-primary rounded-full absolute left-0 transform -translate-x-8"></div>
                          )}
                        </div>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{milestone.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Junte-se à Nossa Comunidade
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Faça parte da principal associação de terapia da mão em Portugal e aceda a
            recursos exclusivos, formação contínua e uma rede de profissionais dedicados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90"
              onClick={() => router.push('/contact')}
            >
              Tornar-se Membro
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => router.push('/contact')}
            >
              Saber Mais
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}