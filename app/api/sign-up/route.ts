import { SignUpFieldsType } from "@/app/sign-up/page";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body as SignUpFieldsType;
    console.log(username, email, password);

    //check if this users already exists
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return NextResponse.json(
        { error: "User with given email already exists." },
        { status: 400 },
      );
    }

    // hash the password, you don't want to save it as a plain text to the DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", success: true, data: newUser },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
