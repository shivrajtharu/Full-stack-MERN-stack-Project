import mongoose from "mongoose";

const HomeSlideSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HomeSlideModel = mongoose.model("HomeSlide", HomeSlideSchema);
export default HomeSlideModel;
