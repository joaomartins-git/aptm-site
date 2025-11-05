// Content types for external JSON data

export type IconName =
  | 'Users' | 'Search' | 'Handshake' | 'Award'
  | 'BookOpen' | 'Target' | 'CheckCircle' | 'Clock';

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  href?: string;
  badge?: string;
  pricing?: {
    type: string;
    description: string;
    price?: string;
    period?: string;
  };
    // the JSON gives a plain string here; allow string but prefer IconName
  icon?: IconName | string;
}

export interface ServicesData {
  mainServices: Service[];
  additionalServices: Service[];
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
  description: string;
  duration: string;
  level: string;
  format: string;
  price: string;
  instructor: string;
  modules: number;
  certification: boolean;
  image?: string;
  isPlaceholder?: boolean;
  highlights: string[];
}