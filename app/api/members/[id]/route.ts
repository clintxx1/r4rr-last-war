import { NextResponse } from "next/server";
import Member from "@/models/Member";
import dbConnect from "@/lib/mongoose";
import { verifyApiKey } from "@/lib/auth";

// GET a single member by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;

  const member = await Member.findById(id);

  if (!member) {
    return NextResponse.json({ message: "Member not found" }, { status: 404 });
  }

  return NextResponse.json(member);
}

// UPDATE a member by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const authError = await verifyApiKey(req);
  if (authError) return authError;

  const { id } = await params;
  const body = await req.json();

  const updatedMember = await Member.findByIdAndUpdate(
    id,
    { $set: body },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedMember) {
    return NextResponse.json({ message: "Member not found" }, { status: 404 });
  }

  return NextResponse.json(updatedMember);
}

// DELETE a member by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const authError = await verifyApiKey(req);
  if (authError) return authError;

  const { id } = await params;

  const deletedMember = await Member.findByIdAndDelete(id);

  if (!deletedMember) {
    return NextResponse.json({ message: "Member not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Member deleted" });
}
