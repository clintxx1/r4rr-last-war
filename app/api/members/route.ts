import dbConnect from "@/lib/mongoose";
import Member from "@/models/Member";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const members = await Member.find();
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  await dbConnect();
  // const data = await req.json();
  const data = {
    name: "Kwekk",
    gender: "Male",
    level: 22,
    alliancePosition: "R4",
    positionDescription: "Butler",
    totalPower: 16.4,
    powerUnit: "M",
    enemyDefeated: 417.6,
    defeatedUnit: "K",
    likes: 220,
    giftLevel: 0,
  }
  const newMember = await Member.create(data);
  return NextResponse.json(newMember, { status: 201 });
}
