// middleware.js (di root Next.js)
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;

  // Jika route diawali /dashboard dan tidak ada token, redirect ke login '/'
  if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
