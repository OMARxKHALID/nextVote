import { ConnectDB } from "@/lib/db/connet";
import { NextResponse } from "next/server";
import Comment from "@/app/models/comment";

export const POST = async (req) => {
  const voteId = await req.json();

  try {
    await ConnectDB();

    const comments = await Comment.find({ vote_id: voteId }).populate(
      "send_by"
    );
    // Map over the comments to extract user information
    const commentsWithUser = comments.map((comment) => {
      return {
        _id: comment._id,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        user: {
          _id: comment.send_by._id,
          name: comment.send_by.name,
          image: comment.send_by.image,
          email: comment.send_by.email,
          created_at: comment.send_by.created_at,
        },
      };
    });

    return NextResponse.json(commentsWithUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
