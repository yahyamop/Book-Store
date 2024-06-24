import { Schema, Types, model } from "mongoose";

const categorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const categoryModel = model("Category", categorySchema);
export default categoryModel;
