/**
 * Centralized content access layer for APTM site
 *
 * This file provides a clean abstraction between data sources and components.
 * Future CMS integration can be done here without affecting any page components.
 */

import { Users, Search, Handshake, Award, BookOpen, Target, CheckCircle, Clock } from 'lucide-react'
import type { Service, Event, Training, ServicesData } from '../../lib/types'

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