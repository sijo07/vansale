import mongoose from "mongoose";

const vanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Van", vanSchema);
