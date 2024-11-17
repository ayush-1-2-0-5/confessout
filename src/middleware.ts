import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('sessionToken')
  
  if (!sessionToken && request.nextUrl.pathname.startsWith('/confession')) {
    return NextResponse.redirect(new URL('/gotoyourconfession', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/confession/:path*',
}