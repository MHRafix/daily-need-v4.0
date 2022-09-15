import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, default: "uncategorized" },
    cat_name2: { type: String, required: true, default: "uncategorized" },
    cat_name: { type: String, required: true, default: "uncategorized" },
    cat_image: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
