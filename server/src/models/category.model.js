import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,

    },
  ],
  parentCatName: {
    type: String,
  },
  parentId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    default: null
  },
}, {
    timestamps: true
});

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
