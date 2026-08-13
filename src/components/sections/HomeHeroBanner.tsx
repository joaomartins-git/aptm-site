'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function HomeHeroBanner() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/aptm-hero-hand-therapy_thirdly.jpg"
          alt="Terapeuta da mão com paciente"
          fill
          priority
          className="object-cover"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/35 via-slate-900/45 to-slate-900/75" />
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center min-h-screen flex flex-col justify-center items-center px-6">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white mb-8 leading-tight">
            Associação Portuguesa de Terapia da Mão
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Excelência em Reeducação da Mão e Membro Superior. 
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/join">
              <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 py-6 bg-white text-slate-900 shadow-xl hover:scale-105 hover:bg-white transition-all duration-300"
              >
                Junte-se à Comunidade de Terapeutas da Mão 
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}