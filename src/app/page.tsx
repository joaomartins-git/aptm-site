'use client'

import { HomeHeroBanner } from "@/components/sections/HomeHeroBanner";
import { HomeNewsCarousel } from "@/components/sections/HomeNewsCarousel";
import { HomeCalendarAgenda } from "@/components/sections/HomeCalendarAgenda";
import { HomeNavCards } from "@/components/sections/HomeNavCards";
import { HomeInstagram } from "@/components/sections/HomeInstagram";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { EventsOverview } from "@/components/sections/EventsOverview";
import { CallToAction } from "@/components/sections/CallToAction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Heart, Target, Award, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Home Hero Banner */}
      <HomeHeroBanner />

      {/* Home Navigation Cards */}
      <HomeNavCards />

      {/* Home Instagram Gallery */}
      <HomeInstagram />

      {/* Home News Carousel */}
      <HomeNewsCarousel />

      {/* Home Calendar Agenda */}
      <HomeCalendarAgenda />
      
      {/* About Preview Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Sobre a APTM
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                A Associação Portuguesa de Terapia da Mão é a principal organização
                profissional dedicada à promoção e desenvolvimento da terapia da mão
                em Portugal. Representamos e apoiamos terapeutas da mão, fisioterapeutas
                e terapeutas ocupacionais especializados.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Com uma comunidade ativa de profissionais, oferecemos formação contínua,
                eventos especializados, recursos educacionais e uma plataforma para
                colaboração e desenvolvimento profissional.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">500+</h4>
                    <p className="text-sm text-muted-foreground">Membros Ativos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">15+</h4>
                    <p className="text-sm text-muted-foreground">Anos de Experiência</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => window.location.href = '/about'}>
                Saber Mais Sobre Nós
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Promover excelência no tratamento da mão e membro superior
                    através de educação, investigação e prática baseada em evidências.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Visão</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Ser a referência nacional e internacional em terapia da mão,
                    reconhecida pela qualidade e inovação dos nossos profissionais.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Excelência, integridade, colaboração, inovação e compromisso
                    com o desenvolvimento profissional contínuo.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Comunidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Rede de profissionais dedicados, partilhando conhecimento
                    e experiências para avançar a prática da terapia da mão.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <ServicesOverview />

      {/* Events Overview */}
      <EventsOverview />

      {/* Call to Action */}
      <CallToAction />
    </>
  );
}
