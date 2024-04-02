import { ConnectDB } from "@/lib/db/connet";
import Vote from "@/app/models/vote";
import VoteOption from "@/app/models/VoteOption";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await ConnectDB();

    const { _id } = await req.json();

    const vote = await Vote.findById(_id);

    if (!vote) {
      return NextResponse.json({ error: "Vote not found" }, { status: 404 });
    }

    const voteOptions = await VoteOption.findOne({ vote_id: _id });

    if (!voteOptions) {
      return NextResponse.json(
        { error: "voteOptions not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(voteOptions);
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
