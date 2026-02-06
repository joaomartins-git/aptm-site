'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { BookOpen, Users, Clock, Star, Award, Target, TrendingUp, Shield } from 'lucide-react'
import { getTrainings } from '@/lib/content'

const trainingCourses = getTrainings()

const levelInfo = {
  'Básico': 'Ideal para estudantes e profissionais iniciantes',
  'Intermediário': 'Requer conhecimentos básicos prévios',
  'Avançado': 'Dirigido a profissionais experientes'
}

const formatInfo = {
  'Presencial': 'Aulas presenciais em locais designados',
  'Online': 'Acesso total à plataforma online',
  'Híbrido': 'Combinação de aulas presenciais e online'
}

const certificationBenefits = [
  {
    icon: Award,
    title: 'Reconhecimento Nacional',
    description: 'Certificado reconhecido por instituições de saúde em Portugal'
  },
  {
    icon: Shield,
    title: 'Validação de Competências',
    description: 'Atestado oficial de competências clínicas avaliadas'
  },
  {
    icon: TrendingUp,
    title: 'Desenvolvimento Profissional',
    description: 'Créditos para desenvolvimento profissional contínuo'
  },
  {
    icon: Users,
    title: 'Rede Profissional',
    description: 'Acesso exclusivo a rede de profissionais certificados'
  }
]

export default function TrainingsPage() {
  const router = useRouter()

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Formações"
        title="Desenvolvimento Profissional de Excelência"
        description="Comprometida com o desenvolvimento profissional contínuo, a APTM oferece cursos, workshops e programas de especialização em Terapia da Mão e Reeducação do Membro Superior. As formações são conduzidas por especialistas reconhecidos e destinam-se a profissionais que procurar desenvolver os seus conhecimentos teóricos e clínicos."
        primaryAction={{
          label: "Inscrever-se em Formações",
          href: "/contact"
        }}
        secondaryAction={{
          label: "Catálogo Completo",
          href: "#courses"
        }}
      />

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Porquê Escolher Nossas Formações?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos programas de alta qualidade com reconhecimento e benefícios para sua carreira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificationBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="py-20 bg-muted/30" id="courses">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Catálogo de Formações
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore nossos programas de formação disponíveis
            </p>
          </div>

          {/* Filter Options */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nível</label>
                  <select className="w-full px-3 py-2 border border-input bg-background text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Todos os níveis</option>
                    {Object.keys(levelInfo).map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Formato</label>
                  <select className="w-full px-3 py-2 border border-input bg-background text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Todos os formatos</option>
                    {Object.keys(formatInfo).map((format) => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Duração</label>
                  <select className="w-full px-3 py-2 border border-input bg-background text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Qualquer duração</option>
                    <option value="short">Até 30 horas</option>
                    <option value="medium">30-50 horas</option>
                    <option value="long">Mais de 50 horas</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button className="flex-1">Filtrar Cursos</Button>
                <Button variant="outline" className="flex-1">Limpar Filtros</Button>
              </div>
            </div>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingCourses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/50" />
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="outline">
                      {course.level}
                    </Badge>
                    {course.certification && (
                      <Badge variant="secondary">
                        <Award className="h-3 w-3 mr-1" />
                        Certificado
                      </Badge>
                    )}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl mb-2 line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {course.modules} módulos
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">
                    {course.description}
                  </CardDescription>

                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">Destaques:</h4>
                    <ul className="space-y-1">
                      {(course.highlights ?? []).slice(0, 3).map((highlight: string, index: number) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 text-primary mr-2" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">
                      {course.price}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {course.format}
                    </Badge>
                  </div>

                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    disabled={course.isPlaceholder}
                    onClick={() => !course.isPlaceholder && router.push(`/trainings/${course.id}`)}
                  >
                    {course.isPlaceholder ? 'Em Breve' : 'Ver Detalhes'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Program */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Programa de Certificação APTM
              </h2>
              <p className="text-lg text-muted-foreground">
                O programa mais completo de certificação em terapia da mão em Portugal
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Torne-se um Terapeuta da Mão Certificado
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Requisitos Claros</h4>
                        <p className="text-muted-foreground text-sm">
                          Processo transparente com critérios bem definidos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Avaliação Abrangente</h4>
                        <p className="text-muted-foreground text-sm">
                          Avaliação teórica e prática por especialistas reconhecidos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Desenvolvimento Contínuo</h4>
                        <p className="text-muted-foreground text-sm">
                          Programa de recertificação para manutenção de competências
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => router.push('/contact')}
                  >
                    Saiba Mais Sobre Certificação
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    'Formação teórica avançada',
                    'Módulos práticos supervisionados',
                    'Avaliação de competências clínicas',
                    'Prova teórica nacional',
                    'Certificado reconhecido'
                  ].map((item: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-background rounded-2xl p-8 md:p-12 shadow-sm border">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Plataforma de Formações em Desenvolvimento
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Estamos criando uma plataforma completa de ensino online com acesso a materiais,
              fóruns de discussão, avaliação contínua, certificados digitais e acompanhamento
              personalizado do progresso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Cursos em desenvolvimento</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Horas de conteúdo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">Q1 2025</div>
                <div className="text-sm text-muted-foreground">Lançamento previsto</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push('/contact')}>
                Receber Novidades
              </Button>
              <Button variant="outline" onClick={() => router.push('/contact')}>
                Sugerir Curso
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Opportunities */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Diagnóstico de Necessidades Formativas 
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ajude-nos a identificar as suas necessidades formativas e a promover o seu desenvolvimento profissional no âmbito da terapia da mão
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeC_nIG2HBD9wAR-q_-BsXCA9_tjsZLeWp383M-foglcmaJ6Q/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              👁️ Ver Formulário
            </a>
            {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Alcance Ampliado</h3>
                  <p className="text-sm text-muted-foreground">
                    Alcance centenas de profissionais interessados em sua área de especialização
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Reconhecimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Seja reconhecido como especialista e líder na sua área de atuação
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Desenvolvimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Desenvolva habilidades de ensino e amplie seu portfólio profissional
                  </p>
                </CardContent>
              </Card>
            </div>
            <Button size="lg" onClick={() => router.push('/contact')}>
              Candidate-se como Instrutor
            </Button>*/}
          </div>
        </div>
      </section>
    </>
  )
}
