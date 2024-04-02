import mongoose from "mongoose";

const voteOptionSchema = new mongoose.Schema(
  {
    vote_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote",
      required: true,
    },
    options: { type: Map, of: Number, required: true },
  },
  { timestamps: true }
);

const VoteOption =
  mongoose.models.VoteOption || mongoose.model("VoteOption", voteOptionSchema);

export default VoteOption;
