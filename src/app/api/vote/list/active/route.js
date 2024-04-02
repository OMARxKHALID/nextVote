import { ConnectDB } from "@/lib/db/connet";
import Vote from "@/app/models/vote";
import User from "@/app/models/user";

import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await ConnectDB();
    // Find all active votes where end_date is greater than current date
    const activeVotes = await Vote.find({ end_date: { $gt: new Date() } });

    // Array to store user IDs
    const createdByUserIds = activeVotes.map((vote) => vote.created_by);

    // Find all users whose IDs are in createdByUserIds
    const allUsers = await User.find({ _id: { $in: createdByUserIds } });

    const data = {
      votes: activeVotes,
      users: allUsers,
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
