import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      source: string
    }
  }

  interface User {
    role: string
    source: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    source: string
  }
}