import { Schema, model, ObjectId } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  avatar: { type: String },
  diskSize: { type: Number, default: 1024 ** 2 * 100 },
  usedDiskSpace: { type: Number, default: 0 },
  files: [{ type: ObjectId, ref: "File" }],
});

export const UserModel = model("User", UserSchema);
