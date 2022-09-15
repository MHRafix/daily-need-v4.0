import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    product_slug: { type: String, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_pic: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    product_pic: { type: String, required: true },
    review_date: {
      current_date: { type: Number, required: true },
      current_month: { type: Number, required: true },
      current_year: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Reviews =
  mongoose.models.Review || mongoose.model("Review", reviewsSchema);
export default Reviews;
