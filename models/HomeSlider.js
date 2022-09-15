import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    image_name: { type: String, required: true },
    slider_image: { type: String, required: true },
  },
  { timestamps: true }
);

const HomeSlider =
  mongoose.models.HomeSlider || mongoose.model("HomeSlider", sliderSchema);
export default HomeSlider;
