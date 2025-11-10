/**
 * Centralized content access layer for APTM site
 *
 * This file provides a clean abstraction between data sources and components.
 * Future CMS integration can be done here without affecting any page components.
 */

import { Users, Search, Handshake, Award, BookOpen, Target, CheckCircle, Clock } from 'lucide-react'
import type { Service, Event, Training, ServicesData, NewsItem } from '@/lib/types'

// Import JSON data
import servicesData from '../../data/services.json'
import eventsData from '../../data/events.json'
import trainingsData from '../../data/trainings.json'

// Icon mapping for services
const iconMap = {
  Users, Search, Handshake, Award, BookOpen, Target, CheckCircle, Clock
} as const

/**
 * Retrieves all services data
 * @returns {ServicesData} Object containing mainServices and additionalServices arrays
 *
 * CMS Integration Point:
 * Replace JSON import with CMS API call:
 * const response = await cmsClient.getServices()
 * return response.data
 */
export function getServices(): ServicesData {
  return {
    mainServices: servicesData.mainServices as Service[],
    additionalServices: servicesData.additionalServices as Service[]
  }
}

/**
 * Retrieves all upcoming events data
 * @returns {Event[]} Array of upcoming events
 *
 * CMS Integration Point:
 * Replace JSON import with CMS API call:
 * const response = await cmsClient.getUpcomingEvents()
 * return response.data
 */
export function getEvents(): Event[] {
  return eventsData.upcomingEvents as Event[]
}

/**
 * Retrieves all training courses data
 * @returns {Training[]} Array of training courses
 *
 * CMS Integration Point:
 * Replace JSON import with CMS API call:
 * const response = await cmsClient.getCourses()
 * return response.data
 */
export function getTrainings(): Training[] {
  return trainingsData.courses as Training[]
}

/**
 * Retrieves all news items data
 * @returns {NewsItem[]} Array of news items
 *
 * CMS Integration Point:
 * Replace mock data with CMS API call:
 * const response = await cmsClient.getNews()
 * return response.data
 */
export function getNews(): NewsItem[] {
  return [
    {
      id: '1',
      title: 'Nova Técnica de Reabilitação Pós-Cirúrgica Apresentada no Congresso Internacional',
      excerpt: 'Investigadores portugueses apresentam abordagem inovadora para recuperação funcional após cirurgia da mão, reduzindo tempo de reabilitação em 40%.',
      date: '2024-10-15',
      href: '/news/1',
      image: '/news/congresso-2024.jpg'
    },
    {
      id: '2',
      title: 'APTM Lança Programa de Formação Contínua em Terapia da Mão',
      excerpt: 'Novo programa oferece certificação internacional e acesso às mais recentes técnicas e evidências científicas na área.',
      date: '2024-10-08',
      href: '/news/2',
      image: '/news/formacao-continua.jpg'
    },
    {
      id: '3',
      title: 'Estudo Revela Eficácia da Terapia Ocupacional em Doentes Artríticos',
      excerpt: 'Pesquisa publicada no Journal of Hand Therapy demonstra melhorias significativas na função e qualidade de vida dos pacientes.',
      date: '2024-09-28',
      href: '/news/3'
    },
    {
      id: '4',
      title: 'Workshop sobre Tecnologias de Realidade Virtual na Reabilitação',
      excerpt: 'Evento em Lisboa reúne especialistas para demonstrar aplicações práticas de RV e RA na terapia da mão.',
      date: '2024-09-20',
      href: '/news/4',
      image: '/news/workshop-rv.jpg'
    },
    {
      id: '5',
      title: 'Membros da APTM Participam em Projeto Europeu de Investigação',
      excerpt: 'Projeto focado no desenvolvimento de novos protocolos de tratamento para lesões do tendão envolve equipas de 5 países.',
      date: '2024-09-12',
      href: '/news/5'
    },
    {
      id: '6',
      title: 'Guia de Boas Práticas na Reabilitação da Mão Publicado',
      excerpt: 'Documento elaborado por especialistas da APTM estabelece padrões de qualidade para tratamento de condições músculo-esqueléticas.',
      date: '2024-09-05',
      href: '/news/6',
      image: '/news/guia-praticas.jpg'
    },
    {
      id: '7',
      title: 'Webinar Gratuito: Novas Abordagens no Tratamento da Síndrome do Túnel Cárpico',
      excerpt: 'Sessão online em outubro abordará técnicas minimamente invasivas e resultados a longo prazo.',
      date: '2024-08-30',
      href: '/news/7'
    },
    {
      id: '8',
      title: 'APTM Celebra 15 Anos de Excelência na Terapia da Mão',
      excerpt: 'Associação comemora mais de uma década dedicação à formação e desenvolvimento profissional dos terapeutas portugueses.',
      date: '2024-08-15',
      href: '/news/8',
      image: '/news/aniversario-aptm.jpg'
    }
  ]
}
