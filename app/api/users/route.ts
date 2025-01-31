import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const rawUsers = await prisma.users.findMany();
  const users = rawUsers.map(({ password_hash, ...rest }) => rest);
  return NextResponse.json(users);
}
