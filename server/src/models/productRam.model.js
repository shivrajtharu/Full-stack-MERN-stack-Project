import mongoose from "mongoose";

const ProductRamsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ProductRamModel = mongoose.model("ProductRam", ProductRamsSchema);
export default ProductRamModel;
