import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const profileRoute = req.nextUrl.pathname.startsWith("/profile");
  const signInRoute = req.nextUrl.pathname.startsWith("/sign-in");
  const signUpRoute = req.nextUrl.pathname.startsWith("/sign-up");
  const isAuthenticated = req.cookies.get("accessToken");

  if (profileRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (signInRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (signUpRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};
