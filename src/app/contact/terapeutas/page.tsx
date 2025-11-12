'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import therapistsData from '@/data/therapists.json'
import type { District, Therapist } from '@/types'
import { MapPin, Mail, Phone, Globe, Search, AlertCircle } from 'lucide-react'

const districts: District[] = [
  'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra',
  'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre',
  'Porto', 'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real',
  'Viseu', 'Açores', 'Madeira'
]

export default function TherapistFinderPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<District | ''>('')
  const [selectedTherapist, setSelectedTherapist] = useState<string>('')
  const [nameFilter, setNameFilter] = useState('')

  const filteredTherapists = useMemo(() => {
    let filtered = therapistsData as Therapist[]

    if (selectedDistrict) {
      filtered = filtered.filter(t => t.district === selectedDistrict)
    }

    if (nameFilter.trim()) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(nameFilter.trim().toLowerCase())
      )
    }

    return filtered
  }, [selectedDistrict, nameFilter])

  const selectedTherapistData = useMemo(() => {
    return filteredTherapists.find(t => t.id === selectedTherapist)
  }, [filteredTherapists, selectedTherapist])

  // Reset therapist selection when district changes
  useEffect(() => {
    setSelectedTherapist('')
  }, [selectedDistrict])

  const GoogleMapEmbed = ({ therapist }: { therapist: Therapist }) => {
    const hasCoordinates = therapist.lat && therapist.lng
    const hasApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY

    if (hasCoordinates && hasApiKey) {
      return (
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${hasApiKey}&q=${therapist.lat},${therapist.lng}`}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Localização de ${therapist.name}`}
          className="rounded-lg"
        />
      )
    }

    const mapQuery = therapist.address
      ? encodeURIComponent(`${therapist.name}, ${therapist.address}`)
      : encodeURIComponent(`${therapist.name}, ${therapist.district}`)

    return (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary hover:underline"
      >
        <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
        Ver no Google Maps
      </a>
    )
  }

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 py-16">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Encontrar Terapeuta</h1>
        <p className="text-lg text-muted-foreground">
          Use os filtros abaixo para encontrar um terapeuta de hand therapy na sua região.
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px]">
          <Select
            id="district-select"
            label="Distrito"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value as District | '')}
            options={districts.map(district => ({
              value: district,
              label: district
            }))}
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <Select
            id="therapist-select"
            label="Terapeuta"
            value={selectedTherapist}
            onChange={(e) => setSelectedTherapist(e.target.value)}
            disabled={!selectedDistrict}
            options={filteredTherapists.map(therapist => ({
              value: therapist.id,
              label: `${therapist.name} - ${therapist.profession}`
            }))}
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <Input
            id="name-filter"
            type="text"
            placeholder="Filtrar por nome..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            icon={Search}
            label="Pesquisar por nome"
          />
        </div>
      </div>

      {/* Empty States */}
      {!selectedDistrict && (
        <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-8">
          <AlertCircle className="h-5 w-5 text-blue-600" aria-hidden="true" />
          <p className="text-blue-800">
            Selecione um distrito para ver os terapeutas disponíveis.
          </p>
        </div>
      )}

      {selectedDistrict && filteredTherapists.length === 0 && (
        <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-8">
          <AlertCircle className="h-5 w-5 text-yellow-600" aria-hidden="true" />
          <p className="text-yellow-800">
            Nenhum terapeuta encontrado neste distrito para a pesquisa atual.
          </p>
        </div>
      )}

      {selectedDistrict && filteredTherapists.length > 0 && nameFilter && filteredTherapists.length === 0 && (
        <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-8">
          <AlertCircle className="h-5 w-5 text-yellow-600" aria-hidden="true" />
          <p className="text-yellow-800">
            Nenhum terapeuta encontrado para esta pesquisa.
          </p>
        </div>
      )}

      {/* A11y Live Region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {selectedTherapistData && `Terapeuta selecionado: ${selectedTherapistData.name}`}
        {selectedDistrict && `Distrito selecionado: ${selectedDistrict}. Encontrados ${filteredTherapists.length} terapeutas.`}
      </div>

      {/* Therapist Details Card */}
      {selectedTherapistData && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{selectedTherapistData.name}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">{selectedTherapistData.profession}</Badge>
              <Badge variant="outline">{selectedTherapistData.district}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedTherapistData.institution && (
              <div>
                <h4 className="font-semibold mb-1">Instituição</h4>
                <p className="text-muted-foreground">{selectedTherapistData.institution}</p>
              </div>
            )}

            {selectedTherapistData.address && (
              <div>
                <h4 className="font-semibold mb-1">Morada</h4>
                <p className="text-muted-foreground">{selectedTherapistData.address}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {selectedTherapistData.email && (
                <a
                  href={`mailto:${selectedTherapistData.email}`}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                  {selectedTherapistData.email}
                </a>
              )}

              {selectedTherapistData.phone && (
                <a
                  href={`tel:${selectedTherapistData.phone}`}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  {selectedTherapistData.phone}
                </a>
              )}

              {selectedTherapistData.website && (
                <a
                  href={selectedTherapistData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                  Website
                </a>
              )}
            </div>

            {selectedTherapistData.specialties && selectedTherapistData.specialties.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Especialidades</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTherapistData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="default">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Map Integration */}
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Localização</h4>
              <GoogleMapEmbed therapist={selectedTherapistData} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}