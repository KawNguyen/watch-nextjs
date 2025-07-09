import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = req.cookies.get("accessToken");

  const isAccountPage = pathname.startsWith("/account");
  const isAuthPage = ["/sign-in", "/sign-up"].includes(pathname);

  // if (!isAuthenticated) return redirectTo("/sign-in", req);

  

  if (isAccountPage && !isAuthenticated) {
    return redirectTo("/sign-in", req);
  }

  if (isAuthPage && isAuthenticated) {
    return redirectTo("/", req);
  }

  return NextResponse.next();
};

function redirectTo(path: string, req: NextRequest) {
  return NextResponse.redirect(new URL(path, req.url));
}

export const config = {
  matcher: ["/account/:path*", "/sign-in", "/sign-up"],
};
