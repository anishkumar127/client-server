import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email already taken!."],
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model("user", userSchema);
