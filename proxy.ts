import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/join'];

export function proxy(request: NextRequest) {
  // const token = request.cookies.get('token')?.value;
  // const { pathname } = request.nextUrl;

  // const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  // const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  // // Not logged in → redirect to login (except auth & public routes)
  // if (!token && !isAuthRoute && !isPublicRoute) {
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // Already logged in → redirect away from auth pages
  // if (token && isAuthRoute) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
