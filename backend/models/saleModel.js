import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
