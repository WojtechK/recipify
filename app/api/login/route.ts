import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 1. Get the email and password from the request body
 * 2. Check if the user exists
 * 3. Check if the password is correct
 * 4. Create a JWT token and set it in the user cookies
 * 5. Return a success message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    //check if this users already exists
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 },
      );
    }

    // check if the password is correct
    const valid = await bcrypt.compare(password, user?.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 },
      );
    }
    // after we verified the user is valid, we can create a JWT token and return it to the user cookies
    // first create token data
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // The secret needs to be encoded

    const jwtToken = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
      data: user,
    });
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "lax", // Lax is usually a good option to ensure the cookie is sent with same-site requests
      path: "/", // Ensure the cookie is available across your site
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
