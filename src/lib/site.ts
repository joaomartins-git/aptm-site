// Site configuration constants for APTM

export const IBAN = 'PT50 0010 0000 2296 3770 0013 3' as const;
export const MBWAY_PHONE = '+351 912 345 678' as const;

export const MEMBERSHIP_FEES = {
  semestral: 36,
  anual: 70,
} as const;

export const PORTUGUESE_DISTRICTS = [
  // Mainland districts
  'Aveiro',
  'Beja',
  'Braga',
  'Bragança',
  'Castelo Branco',
  'Coimbra',
  'Évora',
  'Faro',
  'Guarda',
  'Leiria',
  'Lisboa',
  'Portalegre',
  'Porto',
  'Santarém',
  'Setúbal',
  'Viana do Castelo',
  'Vila Real',
  'Viseu',
  // Autonomous regions and islands
  'Ilha da Graciosa',
  'Ilha da Madeira',
  'Ilha de Porto Santo',
  'Ilha de Santa Maria',
  'Ilha de São Jorge',
  'Ilha de São Miguel',
  'Ilha do Corvo',
  'Ilha do Faial',
  'Ilha do Pico',
  'Ilha Terceira',
  'Angra do Heroísmo',
  'Funchal',
] as const;

export const  PROFESSIONS = [
  'Terapeuta da Mão',
  'Terapeuta Ocupacional',
  'Fisioterapeuta',
  'Cirurgião',
  'Outro',
] as const;

export const  HABILITATIONS = [
  'Estudante',
  'Licenciatura',
  'Pós-Graduação',
  'Mestrado',
  'Doutoramento',
] as const;

// Type definitions
export type District = typeof PORTUGUESE_DISTRICTS[number];
export type Profession = typeof PROFESSIONS[number];
export type Habilitation = typeof HABILITATIONS[number];