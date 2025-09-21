import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // expire after 7 days (match your JWT expiry time)
    expires: "7d",
  },
});

const blackListModel = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default blackListModel;
