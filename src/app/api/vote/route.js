import { ConnectDB } from "@/lib/db/connet";
import User from "@/app/models/user";
import Vote from "@/app/models/vote";
import VoteOption from "@/app/models/VoteOption";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { vote } = await req.json();
  const { description, end_date, title, vote_options, userId } = vote;
  try {
    if (!end_date || !title || !vote_options) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await ConnectDB();
    const existingVote = await Vote.findOne({ title });
    if (existingVote) {
      return NextResponse.json(
        { error: "Vote already exists" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const newVote = new Vote({
      created_by: existingUser._id,
      description,
      end_date,
      title,
    });

    await newVote.save();

    const voteOption = new VoteOption({
      vote_id: newVote._id,
      options: vote_options,
    });
    await voteOption.save();

    return NextResponse.json(
      { message: "Vote created successfully", vote: newVote },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
