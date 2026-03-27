import NextAuth, {DefaultSession} from 'next-auth'
import { Role } from '@types/roles'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: Role
      source: string
    } & DefaultSession ['user']
  }

  interface User {
    role: Role
    source: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role
    source: string
  }
}