// Content types for external JSON data

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
  };
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