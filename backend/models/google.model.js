import mongoose from "mongoose";

const googleSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Google = mongoose.model("Google", googleSchema);
