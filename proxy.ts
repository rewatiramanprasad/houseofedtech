import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  const isAuthPage = pathname.startsWith('/login')
  const isProtected = pathname.startsWith('/dashboard')

 
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

 
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET as string)
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
