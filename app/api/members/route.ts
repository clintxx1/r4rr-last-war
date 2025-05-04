import { verifyApiKey } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Member from "@/models/Member";
import { SortOrder } from "mongoose";
import { NextResponse } from "next/server";
type QueryProps = {
  deletedAt: null | boolean;
  name?: { $regex: string; $options: string; };
  alliancePosition?: string;
};
type SortProps = { [key: string]: SortOrder | { $meta }; };
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const name = searchParams.get("name") || "";
    const alliancePosition = searchParams.get("alliancePosition");
    const totalPower = searchParams.get("totalPower");

    const query: QueryProps = {
      deletedAt: null,
    };
    let sort: SortProps = {
      alliancePosition: -1,
      _id: 1
    };

    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    if (alliancePosition && alliancePosition !== "all") {
      query.alliancePosition = alliancePosition;
    }

    if (totalPower) {
      const sortOrder = totalPower === "desc" ? -1 : 1;
      sort = {
        totalPower: sortOrder,
        _id: 1
      };
    }

    const skip = (page - 1) * limit;
    const [members, totalCount] = await Promise.all([
      await Member.find(query).skip(skip).limit(limit).sort(sort),
      await Member.countDocuments(query),
    ]);

    return NextResponse.json({
      members,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      totalCount,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const authError = await verifyApiKey(req);
    if (authError) return authError;
    const data = await req.json();
    const newMember = await Member.create(data);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
