import { ConnectDB } from "@/lib/db/connet";
import Vote from "@/app/models/vote";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { _id } = await req.json();
  try {
    await ConnectDB();
    const vote = await Vote.findById(_id);
    if (vote.length === 0) {
      return NextResponse.json({ error: "Vote not found" }, { status: 404 });
    }
    await Vote.findByIdAndDelete(_id);

    return NextResponse.json(
      { message: "Vote deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
