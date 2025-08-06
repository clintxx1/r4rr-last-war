import { NextResponse } from "next/server";

export async function verifyApiKey(req: Request) {
  const authHeader = req.headers.get("authorization");
  const secretKey = process.env.NEXT_PUBLIC_API_SECRET_KEY;

  if (!authHeader || authHeader !== `Bearer ${secretKey}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}
