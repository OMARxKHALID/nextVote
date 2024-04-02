import { ConnectDB } from "@/lib/db/connet";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { email, name, image, userId } = await req.json();
    if (!email || !name || !image || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await ConnectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const newUser = new User({
      userId,
      name,
      email,
      image,
    });
    console.log("newUser", newUser);
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
