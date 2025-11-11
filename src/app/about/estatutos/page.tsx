import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Estatutos | APTM',
  description: 'Consulte os estatutos da Associação Portuguesa de Terapia da Mão.',
}

export default function EstatutosPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Estatutos
      </h1>

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg text-muted-foreground mb-12">
          Os estatutos da Associação Portuguesa de Terapia da Mão definem os princípios
          fundamentais, normas de funcionamento e estrutura organizacional que regem
          a nossa associação. Estes documentos garantem a transparência e o cumprimento
          dos nossos objetivos estatutários.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg">
            <a
              href="/docs/estatutos.pdf"
              download
              className="inline-flex items-center gap-2"
            >
              📄 Descarregar PDF
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <a
              href="/docs/estatutos.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              👁️ Ver Online
            </a>
          </Button>
        </div>

        <div className="bg-muted/30 rounded-lg p-8">
          <div className="aspect-[1/1.414] max-w-md mx-auto border-2 border-dashed border-muted-foreground/30 rounded flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-2">📄</div>
              <p>Pré-visualização do documento</p>
              <p className="text-sm">Use os botões acima para visualizar ou descarregar</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}