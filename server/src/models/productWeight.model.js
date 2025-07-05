import mongoose from "mongoose";

const ProductWeightSchema = mongoose.Schema(
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

const ProductWeightModel = mongoose.model("ProductWeight", ProductWeightSchema);
export default ProductWeightModel;
