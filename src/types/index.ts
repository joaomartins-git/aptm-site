// Common types used across the APTM website

export type IconName =
  | 'Users' | 'Search' | 'Handshake' | 'Award'
  | 'BookOpen' | 'Target' | 'CheckCircle' | 'Clock';


export interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  //icon: string;
  href?: string;
  badge?: string;
  pricing?: {
    type: string;
    description: string;
    price?: string;
    period?: string;
  };
  features: string[];
  // the JSON gives a plain string here; allow string but prefer IconName
  icon?: IconName | string;
}

export interface ServicesData {
  mainServices: Service[];
  additionalServices: Service[];
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'webinar' | 'seminar' | 'workshop' | 'conference';
  description: string;
  speaker?: string;
  duration?: string;
  price?: string;
  level?: string;
  image?: string;
  isPlaceholder?: boolean;
}

export interface Training {
  id: string;
  title: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  format: string;
  price: string;
  instructor: string;
  modules: number;
  certification: boolean;
  image?: string;
  isPlaceholder?: boolean;
  highlights: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  href: string;
  image?: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export const BOARD_ROLES = [
  'Presidente',
  'Vice-Presidente',
  'Secretário',
  'Tesoureiro',
  'Vogal',
] as const;

export type BoardRole = typeof BOARD_ROLES[number];

export interface BoardMember {
  id: string;
  name: string;
  role: BoardRole;
  term?: string;        // e.g., "2025–2027"
  photo?: string;       // e.g., "/board/presidente.jpg"
  email?: string;
}

export type District =
  | 'Aveiro' | 'Beja' | 'Braga' | 'Bragança' | 'Castelo Branco' | 'Coimbra'
  | 'Évora' | 'Faro' | 'Guarda' | 'Leiria' | 'Lisboa' | 'Portalegre'
  | 'Porto' | 'Santarém' | 'Setúbal' | 'Viana do Castelo'
  | 'Vila Real' | 'Viseu' | 'Açores' | 'Madeira';

export interface Therapist {
  id: string;
  name: string;
  district: District;
  profession: 'Terapeuta da Mão' | 'TO' | 'FT' | 'Cirurgião' | 'Outro';
  institution?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  lat?: number;
  lng?: number;
  specialties?: string[];
}
