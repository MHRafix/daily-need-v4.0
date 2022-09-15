import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    brand_name: { type: String, required: true },
    brand_image: { type: String, required: true },
  },
  { timestamps: true }
);

const BrandSlider =
  mongoose.models.BrandSlider || mongoose.model("BrandSlider", sliderSchema);
export default BrandSlider;
