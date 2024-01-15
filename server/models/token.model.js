import { Schema, model, ObjectId } from "mongoose";

const TokenSchema = new Schema({
  refreshToken: { type: String, required: true },
  user: { type: ObjectId, ref: "User" },
});

export const TokenModel = model("Token", TokenSchema);
