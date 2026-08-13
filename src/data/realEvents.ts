export const testEvents = [
  {
    title: "Congresso APTM 2026",
    description:
      "Congresso nacional dedicado à terapia da mão e reabilitação do membro superior.",
    imageUrl: null,
    startDate: new Date("2026-09-15T09:00:00"),
    endDate: new Date("2026-09-15T18:00:00"),
    location: "Lisboa",
    registrationUrl: "/contact",
    type: "conference" as const,
    speaker: "APTM",
    duration: "8 horas",
    price: "50€",
    level: "Todos os níveis",
    isPublished: true,
  },

  {
    title: "Workshop de Reabilitação da Mão",
    description:
      "Workshop prático sobre avaliação e intervenção em terapia da mão.",
    imageUrl: null,
    startDate: new Date("2026-10-10T10:00:00"),
    endDate: new Date("2026-10-10T17:00:00"),
    location: "Porto",
    registrationUrl: "/contact",
    type: "workshop" as const,
    speaker: "Dra. Ana Silva",
    duration: "7 horas",
    price: "75€",
    level: "Intermediário",
    isPublished: true,
  },

  {
    title: "Webinar: Novas Abordagens em Terapia da Mão",
    description:
      "Webinar online sobre novas abordagens e evidência científica em terapia da mão.",
    imageUrl: null,
    startDate: new Date("2026-11-05T19:00:00"),
    endDate: new Date("2026-11-05T20:30:00"),
    location: "Online",
    registrationUrl: "/contact",
    type: "webinar" as const,
    speaker: "Dr. João Santos",
    duration: "1h30",
    price: "Gratuito",
    level: "Todos os níveis",
    isPublished: true,
  },
];