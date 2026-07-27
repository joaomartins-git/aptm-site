import { Role } from '@/types/roles'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentialsSchema.parse(credentials)

          // First, check environment variables (existing behavior)
          // if (
          //   email === process.env.AUTH_USER_EMAIL &&
          //   password === process.env.AUTH_USER_PASSWORD
          // ) {
          //   return {
          //     id: 'member-1',
          //     name: 'Sócio',
          //     email: process.env.AUTH_USER_EMAIL!,
          //     role: 'admin' as Role, // Add role for consistency
          //     source: 'env', // Mark authentication source
          //     memberNumber: 0,
          //     profileCompleted: true
          //   }
          // }

          // If not env match, try database authentication
          try {
            const { memberService } = await import('@/lib/services/memberService')
            const member = await memberService.authenticateMember(email, password)
            
            if (!member) {
              return null
            }
            
            
              return {
                id: member.id,
                name: member.name,
                email: member.email ?? '',
                role: member.role as Role,
                source: 'database',
                
                memberNumber: member.memberNumber,
                profileCompleted: member.profileCompleted,
              }
            
          } catch (error) {
            console.error('Database authentication error:', error)
            // Continue with null return if database is not available
          }

          return null
        } catch {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as Role
        session.user.source = token.source as string

        session.user.memberNumber = token.memberNumber as number
        session.user.profileCompleted = token.profileCompleted as boolean
      }
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role
        token.source = user.source

        token.memberNumber = user.memberNumber
        token.profileCompleted = user.profileCompleted
      }
      return token
    }
  }
})

export const { GET, POST } = handlers