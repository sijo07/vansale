import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    fromVan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Van",
      required: true,
    },
    toVan: { type: mongoose.Schema.Types.ObjectId, ref: "Van", required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Transfer", transferSchema);
