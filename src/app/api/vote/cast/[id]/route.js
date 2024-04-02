import { ConnectDB } from "@/lib/db/connet";
import Vote from "@/app/models/vote";
import VoteOption from "@/app/models/VoteOption";
import { NextResponse } from "next/server";
import VoteLog from "@/app/models/VoteLog";
import User from "@/app/models/user";

export const POST = async (req) => {
  try {
    await ConnectDB();
    const { id, option, userId } = await req.json();

    const vote = await Vote.findById(id);
    if (!vote) {
      throw new Error("Vote not found");
    }

    const user = await User.findOne({ userId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let voteOption = await VoteOption.findOneAndUpdate(
      { vote_id: vote._id },
      { $inc: { [`options.${option}`]: 5 } }, // Increment the count of the specified option
      { new: true, upsert: true } // Return the modified document and create a new one if not found
    );
    await voteOption.save();

    const voteLog = new VoteLog({
      vote_id: id,
      user_id: user._id,
      option: option,
    });
    await voteLog.save();

    return NextResponse.json(voteLog);
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
