export interface Partnership {
  name: string
  logoUrl: string
  description: string
  websiteUrl?: string
}

export const partnerships: Partnership[] = [
  {
    name: "IFHST",
    logoUrl: "/partnerships/ifhst.png",
    description:
      "Informação sobre a parceria e a relação da IFHST com a APTM.",
    websiteUrl: "",
  },
  {
    name: "EFSHT",
    logoUrl: "/partnerships/EFSHT.png",
    description:
      "A European Federation of Societies for Hand Therapy reúne sociedades europeias dedicadas à Terapia da Mão.",
    websiteUrl: "",
  },
  {
    name: "Escola Superior de Saúde do Politécnico do Porto",
    logoUrl: "/partnerships/ess-pporto.png",
    description:
      "Informação sobre a colaboração entre a APTM e a Escola Superior de Saúde do Politécnico do Porto.",
    websiteUrl: "",
  },
  {
    name: "Sociedade Portuguesa de Cirurgia da Mão",
    logoUrl: "/partnerships/spcmao.jpg",
    description:
      "Informação sobre a colaboração entre a APTM e a Sociedade Portuguesa de Cirurgia da Mão.",
    websiteUrl: "",
  },
  {
    name: "Gameiros Pharma",
    logoUrl: "/partnerships/gameiros-pharma.jpg",
    description:
      "Informação sobre a parceria entre a APTM e a Gameiros Pharma.",
    websiteUrl: "",
  },
  {
    name: "JMV Produtos Hospitalares",
    logoUrl: "/partnerships/jmv.jpg",
    description:
      "Informação sobre a parceria entre a APTM e a JMV Produtos Hospitalares.",
    websiteUrl: "",
  },
]