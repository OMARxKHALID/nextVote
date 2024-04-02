import mongoose from "mongoose";

const voteLogSchema = new mongoose.Schema(
  {
    vote_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    option: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const VoteLog =
  mongoose.models.VoteLog || mongoose.model("VoteLog", voteLogSchema);

export default VoteLog;
