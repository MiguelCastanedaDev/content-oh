import { NextRequest, NextResponse } from 'next/server';

// Rutas protegidas y públicas
const protectedRoutes = ['/products'];
const publicRoutes = ['/users/login', '/'];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some(route => path.startsWith(route));
  const isPublic = publicRoutes.some(route => path === route);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/users/login', req.url));
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/products', req.url));
  }

  return NextResponse.next();
}