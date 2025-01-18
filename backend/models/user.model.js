import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import isEmail from "validator/lib/isEmail";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: function () {
        this.authType !== "jwt";
      },
      unique: true,
      trim: true,
      validator: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        this.authType === "jwt";
      },
    },
    name: {
      type: String,
      required: function () {
        this.authType === "jwt";
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    authType: {
      type: String,
      enum: ["jwt", "google"],
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiresAt: {
      type: Date,
    },
    // otp: {
    //   code: {
    //     type: String,
    //   },
    //   expiresAt: {
    //     type: Date,
    //   },
    // },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });

userSchema.pre("save", async function (next) {
  if (this.authType === "jwt") {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
