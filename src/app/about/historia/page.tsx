import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'História | APTM',
  description: 'Conheça a história e os marcos importantes da Associação Portuguesa de Terapia da Mão.',
}

const milestones = [
  {
    year: '2009',
    title: 'Fundação da APTM',
    description: 'Criação da Associação Portuguesa de Terapia da Mão com um grupo pioneiro de 25 profissionais.'
  },
  {
    year: '2012',
    title: 'Primeiro Congresso Nacional',
    description: 'Organização do primeiro congresso nacional dedicado exclusivamente à terapia da mão em Portugal.'
  },
  {
    year: '2015',
    title: 'Reconhecimento Internacional',
    description: 'Afiliação à International Federation of Societies for Hand Therapy (IFSHT).'
  },
  {
    year: '2021',
    title: 'Expansão Digital',
    description: 'Implementação de plataforma de formação online e recursos educacionais digitais.'
  },
  {
    year: '2024',
    title: '500+ Membros',
    description: 'Alcance de mais de 500 membros ativos em todo o território nacional.'
  }
]

export default function HistoriaPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        História da APTM
      </h1>

      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
        A Associação Portuguesa de Terapia da Mão (APTm) tem uma rica história de dedicação
        à excelência na reabilitação da mão e membro superior. Desde a sua fundação, temos
        promovido a educação contínua e a investigação científica nesta área especializada.
      </p>

      <div className="max-w-4xl mx-auto space-y-6">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex gap-6 items-start bg-card p-6 rounded-lg border">
            <div className="flex-shrink-0">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold">
                {milestone.year}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
              <p className="text-muted-foreground">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}