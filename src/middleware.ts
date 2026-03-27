import { NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/route'

export async function middleware(req: Request) {
  const session = await auth()

  const url = new URL(req.url)

  if (url.pathname.startsWith('/admin')) {
    if (!session || session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}