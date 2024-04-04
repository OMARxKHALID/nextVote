import { ConnectDB } from "@/lib/db/connet";
import { NextResponse } from "next/server";
import Comment from "@/app/models/comment";
import User from "@/app/models/user";

export const POST = async (req) => {
  const { text, voteId, sendBy } = await req.json();

  try {
    if (!text) {
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 }
      );
    }
    await ConnectDB();
    const user = await User.findOne({ userId: sendBy });

    const newComment = new Comment({
      send_by: user._id,
      vote_id: voteId,
      text,
    });

    await newComment.save();

    return NextResponse.json({ comment: newComment });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
