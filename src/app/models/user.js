import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String },
    name: { type: String },
    image: { type: String },
    email: { type: String },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
