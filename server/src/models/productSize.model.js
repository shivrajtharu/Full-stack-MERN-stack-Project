import mongoose from "mongoose";

const ProductSizeSchema = mongoose.Schema(
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

const ProductSizeModel = mongoose.model("ProductSize", ProductSizeSchema);
export default ProductSizeModel;
