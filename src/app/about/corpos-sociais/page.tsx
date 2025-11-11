import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/Card'
import boardMembers from '@/data/board.json'
import type { BoardMember, BoardRole } from '@/types'

const roleOrder: BoardRole[] = ['Presidente', 'Vice-Presidente', 'Secretário', 'Tesoureiro', 'Vogal']

function groupMembersByRole(members: BoardMember[]) {
  return roleOrder.map(role => ({
    role,
    members: members.filter(member => member.role === role)
  }))
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const metadata: Metadata = {
  title: 'Corpos Sociais | APTM',
  description: 'Conheça os corpos sociais da Associação Portuguesa de Terapia da Mão.',
}

export default function CorposSociaisPage() {
  const groupedMembers = groupMembersByRole(boardMembers)

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Corpos Sociais
        </h1>
        <p className="text-lg text-muted-foreground">
          Mandato 2025–2027
        </p>
      </div>

      <div className="space-y-12">
        {groupedMembers.map((group, index) => (
          group.members.length > 0 && (
            <div key={group.role}>
              <h2 className="text-2xl font-bold mb-6 text-center">{group.role}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((member) => (
                  <Card key={member.id} className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-muted-foreground">
                            {getInitials(member.name)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                      {member.term && (
                        <p className="text-sm text-muted-foreground mb-2">{member.term}</p>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {member.email}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </main>
  )
}