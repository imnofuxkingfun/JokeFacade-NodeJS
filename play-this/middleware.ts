import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/actions/auth';

const protectedRoutes = ['/test'];
const authRoutes = ['/login', '/register'];

export default async function middleware(request: NextRequest) {
  const user = await getSessionUser();
  const path = request.nextUrl.pathname;

  if (user && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!user && protectedRoutes.some(route => path.startsWith(route))) {
    console.log('Redirecting to login from middleware');
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};