import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "User must have an email"],
  },
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
});

export const UserModel = model("User", userSchema);
