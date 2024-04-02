import { ConnectDB } from "@/lib/db/connet";
import Vote from "@/app/models/vote";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const reqdata = await req.json();
  const { _id, data } = reqdata;

  try {
    await ConnectDB();
    const vote = await Vote.findById(_id);
    if (vote.length === 0) {
      return NextResponse.json({ error: "Vote not found" }, { status: 404 });
    }
    await Vote.updateOne({ _id }, data);
    const updatedVote = await Vote.findById(_id);

    return NextResponse.json(updatedVote);
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
