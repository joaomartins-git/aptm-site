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

          // Check against environment variables
          if (
            email === process.env.AUTH_USER_EMAIL &&
            password === process.env.AUTH_USER_PASSWORD
          ) {
            return {
              id: 'member-1',
              name: 'Sócio',
              email: process.env.AUTH_USER_EMAIL!
            }
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
  }
})

export const { GET, POST } = handlers