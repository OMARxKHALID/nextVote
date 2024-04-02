import { ConnectDB } from "@/lib/db/connet";
import VoteLog from "@/app/models/VoteLog";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import Vote from "@/app/models/vote";

export const POST = async (req) => {
  try {
    await ConnectDB();

    const { id, userId } = await req.json();
    const vote = await Vote.findById({ _id: id });
    if (!vote) {
      return NextResponse.json({ error: "Vote not found" }, { status: 404 });
    }

    const user = await User.findOne({ userId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const voteLog = await VoteLog.findOne({ vote_id: id, user_id: user._id });
    if (!voteLog) {
      console.error("VoteLog is not found");
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json(voteLog);
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
