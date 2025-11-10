// Common types used across the APTM website

export interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
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
  isPlaceholder?: boolean;
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
