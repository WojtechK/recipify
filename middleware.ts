// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET); // The secret needs to be encoded

/**
 * Middleware to manage session tokens
 * if the token is valid, the request will be allowed to proceed
 * if the token is invalid or expired, the user will be redirected to the login page
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value as string;

  if (!token) {
    return redirectToLogin(request);
  }

  if (pathname === "/") {
    try {
      await jwtVerify(token, secret);
      return redirectToHome(request);
    } catch (error) {
      return redirectToLogin(request);
    }
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return redirectToLogin(request);
  }
}

const redirectToHome = (request: NextRequest) => {
  return NextResponse.redirect(new URL("/home", request.url));
};

const redirectToLogin = (request: NextRequest) => {
  console.log('redirecting to login');
  return NextResponse.redirect(new URL("/login", request.url));
};

// Define where the middleware should be applied (protected routes)
export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/api/users/:path*",
  ], // Define routes to protect
};
