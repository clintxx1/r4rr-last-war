import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("r4rr"); // set your DB name

    const collections = await db.listCollections().toArray();

    return NextResponse.json({ collections });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json({ error: "Connection failed" }, { status: 500 });
  }
}
