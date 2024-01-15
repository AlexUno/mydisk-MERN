import { Schema, model, ObjectId } from "mongoose";

const FileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  date: { type: Date, default: Date.now() },
  accessLink: { type: String, unique: true },
  parent: { type: ObjectId, ref: "File" },
  childs: [{ type: ObjectId, ref: "File" }],
  user: { type: ObjectId, ref: "User" },
});

export const FileModel = model("File", FileSchema);
