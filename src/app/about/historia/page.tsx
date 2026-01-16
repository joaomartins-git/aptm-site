import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'História | APTM',
  description: 'Conheça a história e os marcos importantes da Associação Portuguesa de Terapia da Mão.',
}

const milestones = [
  {
    year: '2000',
    title: 'Fundação da APTM',
    description: 'A Associação Portuguesa de Terapia da Mão (APTM) foi fundada em 13 de abril de 2000 por cinco sócios fundadores que a registaram no 19.º Cartório Notarial de Lisboa, juntamente com os seus Estatutos. Este registo marcou formalmente o início da atividade da Associação.'
  },
  {
    year: '2000',
    title: 'Aprovação do Regulamento Interno',
    description: 'A 14 de julho de 2000, a Assembleia Geral da APTM aprovou o seu Regulamento Interno. Nessa mesma reunião foram eleitos os primeiros corpos diretivos da Associação. Também foram criados o Gabinete de Comunicação e Publicações e o Conselho Científico, estruturas essenciais para o inicio dos primeiros passos na divulgação, formação e desenvolvimento técnico-científico da Terapia da Mão em Portugal. Nesta data foi ainda elaborada a primeira Carta Aberta dirigida a todos os terapeutas nacionais, com o objetivo de promover a Associação e reforçar a identidade profissional'
  },
  {
    year: '2001',
    title: 'Reconhecimento Internacional',
    description: 'No ano de 2001, passou a ter reconhecimento público com a sua publicação no Diário da República, III Série de 18 de junho de 2001.'
  },
  {
    year: '2001',
    title: 'Membro da I.F.S.H.T. (International Federation of Societies for Hand Therapy)',
    description: 'APTM além fronteiras: Em 2001, Portugal tornou-se membro da I.F.S.H.T. (International Federation of Societies for Hand Therapy) durante o Congresso Internacional realizado em Istambul. No mesmo ano, durante o Meeting da E.F.S.H.T. (European Federation of Societies for Hand Therapy) na Alemanha, o país passou igualmente a integrar esta federação europeia. Mais tarde, em junho de 2003, Portugal assumiu um papel ativo na comunidade internacional ao organizar o Meeting da E.F.S.H.T. em Lisboa.'
  },
  {
    year: '2002',
    title: 'Atualização dos Estatutos',
    description: 'A 9 de dezembro de 2002, foi publicada uma atualização dos Estatutos, ajustando a organização e o funcionamento da Associação às necessidades identificadas após os primeiros anos de atividade.'
  },
  {
    year: '2003',
    title: 'Atualização dos Estatutos',
    description: 'Junho de 2003, Portugal assumiu um papel ativo na comunidade internacional ao organizar o Meeting da E.F.S.H.T. em Lisboa.'
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