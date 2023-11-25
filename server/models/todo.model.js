import mongoose, { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    todo: "String",
  },
  { timestamps: true }
);

export const Todo = model("todo", todoSchema);
