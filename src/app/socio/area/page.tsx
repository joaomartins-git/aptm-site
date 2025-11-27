import { requireAuth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/api/auth/[...nextauth]/route'
import {
  BookOpen,
  Calendar,
  FileText,
  Users
} from 'lucide-react'

export default async function SocioAreaPage() {
  await requireAuth()

  const memberResources = [
    {
      id: 'guides',
      title: 'Guias Clínicos',
      description: 'Aceda a protocolos clínicos atualizados e diretrizes de prática baseada em evidência.',
      icon: BookOpen
    },
    {
      id: 'events',
      title: 'Eventos para Sócios',
      description: 'Participe em eventos exclusivos, workshops e sessões de formação contínua.',
      icon: Calendar
    },
    {
      id: 'documents',
      title: 'Documentos Oficiais',
      description: 'Consulte estatutos, regulamentos e documentos institucionais da APTM.',
      icon: FileText
    },
    {
      id: 'network',
      title: 'Rede de Sócios',
      description: 'Conecte-se com outros profissionais e partilhe experiências e conhecimentos.',
      icon: Users
    }
  ]

  const navigationItems = [
    'Recursos',
    'Eventos',
    'Documentos'
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Bem-vindo à Área de Sócios
          </h1>
          <p className="text-lg text-muted-foreground">
            Este é o espaço partilhado para todos os membros da APTM.
          </p>
        </div>
        <form action={async () => {
          'use server'
          await signOut({ redirectTo: '/' })
        }}>
          <Button type="submit" variant="outline">
            Terminar sessão
          </Button>
        </form>
      </div>

      {/* Mini Navigation Bar */}
      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-12">
        <nav className="flex space-x-8 overflow-x-auto" role="navigation" aria-label="Navegação da área de sócios">
          {navigationItems.map((item) => (
            <button
              key={item}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap pb-1 border-b-2 border-transparent hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Introduction Text */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <p className="text-base leading-relaxed text-muted-foreground">
          Aqui encontrará os recursos e ferramentas essenciais para o seu desenvolvimento profissional
          e networking com outros membros da comunidade de terapia da mão em Portugal.
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {memberResources.map((resource) => {
          const IconComponent = resource.icon
          return (
            <Card
              key={resource.id}
              className="border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <CardDescription className="text-base leading-relaxed">
                  {resource.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}