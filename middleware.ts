import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login'];

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (publicRoutes.includes(url.pathname)) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
