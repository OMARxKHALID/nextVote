import { ConnectDB } from "@/lib/db/connet";
import User from "@/app/models/user";
import Vote from "@/app/models/vote";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { userId } = await req.json();
  try {
    await ConnectDB();
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return NextResponse.json({ error: "User is not found" }, { status: 400 });
    }
    const votes = await Vote.find({ created_by: existingUser._id });
    if (votes.length === 0) {
      return NextResponse.json({ error: "Votes not found" }, { status: 400 });
    }
    return NextResponse.json(votes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
