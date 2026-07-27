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
      memberNumber: number
      profileCompleted: boolean
    } & DefaultSession ['user']
  }

  interface User {
    role: Role
    source: string

    memberNumber: number
    profileCompleted: boolean    
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role
    source: string

    memberNumber: number
    profileCompleted: boolean
  }
}