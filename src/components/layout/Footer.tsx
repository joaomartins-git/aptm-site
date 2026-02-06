'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'

const footerLinks = {
  serviços: [
    { label: 'Consultoria', href: '/services#consulting' },
    { label: 'Investigação', href: '/services#research' },
    { label: 'Parcerias', href: '/services#partnerships' },
    { label: 'Benefícios para Membros', href: '/services#member-benefits' }
  ],
  recursos: [
    { label: 'Eventos', href: '/events' },
    { label: 'Formações', href: '/trainings' },
    { label: 'Publicações', href: '#' },
    { label: 'Notícias', href: '#' }
  ],
  empresa: [
    { label: 'Sobre Nós', href: '/about' },
    { label: 'Missão e Valores', href: '/about#mission' },
    { label: 'Equipa', href: '/about#team' },
    { label: 'Contacto', href: '/contact' }
  ]
}

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/groups/126735657407362/', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/apterapiamao', label: 'Instagram' }
]

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container py-12 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Ir para a página inicial">
              <Image
                src="/logotipo-aptm.png"
                alt="APTM – Associação Portuguesa de Terapia da Mão"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Associação Portuguesa de Terapia da Mão – Promovendo excelência
              e desenvolvimento na terapia da mão em Portugal.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Serviços</h3>
            <ul className="space-y-2">
              {footerLinks.serviços.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">
                  <p>Rua Exemplo, 123</p>
                  <p>1000-001 Lisboa</p>
                  <p>Portugal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+351210000000"
                  className="text-sm text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                >
                  +351 210 000 000
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:geral@aptm.pt"
                  className="text-sm text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                >
                  geral@aptm.pt
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} APTM - Associação Portuguesa de Terapia da Mão.
              Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              >
                Termos de Utilização
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}