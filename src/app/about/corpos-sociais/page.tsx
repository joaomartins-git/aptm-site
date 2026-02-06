import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/Card'
import rawBoard from '@/data/board.json'
import { BOARD_ROLES, type BoardMember, type BoardRole } from '@/types';
import { SOCIAL_CORPS } from '@/data/socialCorps';

const roleOrder: BoardRole[] = ['Presidente', 'Vice-Presidente', 'Secretário', 'Tesoureiro', 'Vogal']

// Turn the raw JSON (role: string) into typed BoardMember (role: BoardRole)
const boardMembers: BoardMember[] = (rawBoard as Array<
  Omit<BoardMember, 'role'> & { role: string }
>).map((m) => ({
  ...m,
  role: (BOARD_ROLES as readonly string[]).includes(m.role as BoardRole)
    ? (m.role as BoardRole)
    : 'Vogal',
}));



function groupMembersByRole(members: BoardMember[]) {
  return BOARD_ROLES.map((role) => ({
    role,
    members: members.filter((m) => m.role === role),
  }));
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
  //const groupedMembers = groupMembersByRole(boardMembers)

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
        {SOCIAL_CORPS.map((group) => (
          <section key={group.type} className="space-y-8">
            <h2 className="text-2xl font-semibold text-center">
              {group.type}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.members.map((member) => (
                <Card key={member.id} className="text-center">
                  <CardContent className="pt-6">
                    <div className="h-20 w-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold text-muted-foreground">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg">
                      {member.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}