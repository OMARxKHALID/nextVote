import { ConnectDB } from "@/lib/db/connet";
import Vote from "@/app/models/vote";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

export const POST = async (req) => {
  try {
    await ConnectDB();

    // Find all expired votes where end_date is less than or equal to current date
    const expiredVotes = await Vote.find({ end_date: { $lte: new Date() } });

    // Array to store user IDs
    const createdByUserIds = expiredVotes.map((vote) => vote.created_by);

    // Find all users whose IDs are in createdByUserIds
    const allUsers = await User.find({ _id: { $in: createdByUserIds } });

    const data = {
      votes: expiredVotes,
      users: allUsers,
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
