'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import type { District } from '@/types'

// Mock data interfaces
interface PersonalData {
  name: string
  memberNumber: string
  profession: string
  district: District
  institution: string
}

interface Quota {
  year: number
  semester: number
  status: string
  paidAt: string
}

interface Certificate {
  title: string
  date: string
}

interface Event {
  title: string
  date: string
  role: string
}

// Mock data
const mockPersonalData: PersonalData = {
  name: "João Silva",
  memberNumber: "APTM-2024-001",
  profession: "Terapeuta da Mão",
  district: "Lisboa",
  institution: "Hospital de São José"
}

const mockQuotas: Quota[] = [
  { year: 2024, semester: 1, status: "Pago", paidAt: "2024-01-15" },
  { year: 2023, semester: 2, status: "Pago", paidAt: "2023-07-20" },
  { year: 2023, semester: 1, status: "Pago", paidAt: "2023-01-18" }
]

const mockCertificates: Certificate[] = [
  { title: "Terapia Manual Avançada", date: "2024-03-15" },
  { title: "Reabilitação Pós-Cirúrgica", date: "2023-11-20" }
]

const mockEvents: Event[] = [
  { title: "Congresso Nacional de Terapia da Mão", date: "2024-02-10", role: "Participante" },
  { title: "Workshop de Técnicas de Mobilização", date: "2023-09-15", role: "Organizador" }
]

const tabs = [
  { id: 'dados', label: 'Dados Pessoais' },
  { id: 'quotas', label: 'Quotas' },
  { id: 'certificados', label: 'Certificados' },
  { id: 'eventos', label: 'Eventos' }
]

interface ProfileClientProps {
  userEmail: string
}

export default function ProfileClient({ userEmail }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState('dados')

  const formatDateString = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dados':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Informação Pessoal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <p className="text-base font-medium">{mockPersonalData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Número de Sócio</label>
                  <p className="text-base font-medium">{mockPersonalData.memberNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Profissão</label>
                  <p className="text-base font-medium">{mockPersonalData.profession}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Distrito</label>
                  <p className="text-base font-medium">{mockPersonalData.district}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Instituição</label>
                  <p className="text-base font-medium">{mockPersonalData.institution}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'quotas':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Quotas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockQuotas.map((quota, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {quota.year} - {quota.semester === 1 ? '1º' : '2º'} Semestre
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pago em {formatDateString(quota.paidAt)}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {quota.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'certificados':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Certificados Obtidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCertificates.map((certificate, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                    <div>
                      <p className="font-medium">{certificate.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Concluído em {formatDateString(certificate.date)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Certificado
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'eventos':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Eventos Participados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents.map((event, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {formatDateString(event.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {event.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Perfil de Sócio
          </h1>
          <p className="text-lg text-muted-foreground">
            {userEmail}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await signOut({ callbackUrl: '/' })
          }}
        >
          Terminar sessão
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  )
}