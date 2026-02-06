import { SocialCorpsGroup } from '@/types';

export const SOCIAL_CORPS: SocialCorpsGroup[] = [
  {
    type: 'Assembleia Geral',
    members: [
      {
        id: 'ag-presidente',
        name: 'Ana Paula Martins',
        role: 'Presidente',
        photo: '/corpos-sociais/ana-paula-martins.png',
      },
      {
        id: 'ag-sec-1',
        name: 'Fabíola Alvino',
        role: 'Primeiro Secretário',
      },
      {
        id: 'ag-sec-2',
        name: 'Ana Catarina Pires Gaspar',
        role: 'Segundo Secretário',
        photo: '/corpos-sociais/ana-catarina-gaspar.png',
      },
    ],
  },

  {
    type: 'Direção',
    members: [
      {
        id: 'dir-presidente',
        name: 'António José Arsénio Duarte',
        role: 'Presidente',
        photo: '/corpos-sociais/antonio-duarte.png',
      },
      {
        id: 'dir-vice',
        name: 'Maria Filomena Bulhão Amaral Vergas Rocha',
        role: 'Vice-Presidente',
      },
      {
        id: 'dir-sec-geral',
        name: 'Inês Serôdio',
        role: 'Secretário-Geral',
        photo: '/corpos-sociais/ines-serodio.png',
      },
      {
        id: 'dir-tesoureiro',
        name: 'Marta Pacheco',
        role: 'Tesoureiro',
      },
      {
        id: 'dir-sec-1',
        name: 'Filipe Alexandre Rodrigues Ferreira',
        role: 'Primeiro Secretário',
      },
      {
        id: 'dir-sec-2',
        name: 'Rafael Luís Martins',
        role: 'Segundo Secretário',
        photo: '/corpos-sociais/rafael-rodrigues.jpg',
      },
      {
        id: 'dir-sec-3',
        name: 'Rafael António Mendes Rodrigues',
        role: 'Terceiro Secretário',
        //photo: '/corpos-sociais/rafael-rodrigues.jpg',
      },
    ],
  },

  {
    type: 'Conselho Fiscal',
    members: [
      {
        id: 'cf-presidente',
        name: 'Sara Alexandra Carrapiço Miguéns',
        role: 'Presidente',
        photo: '/corpos-sociais/sara-minguens.jpg',
      },
      {
        id: 'cf-vice',
        name: 'Ana Cristina Oliveira Botelho',
        role: 'Vice-Presidente',
      },
      {
        id: 'cf-secretario',
        name: 'Ana Pinto Lopes',
        role: 'Secretário',
      },
    ],
  },
];