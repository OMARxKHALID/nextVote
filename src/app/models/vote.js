import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    end_date: { type: Date, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);

export default Vote;
