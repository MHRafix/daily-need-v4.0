import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		thumbnail: { type: String, required: true },
		thumbnail_big: { type: String, required: true },
		prices: {
			regular_price: { type: Number, required: true },
			sale_price: { type: Number, required: true },
		},
		category: { type: String, required: true },
		offer_end: { type: Number, required: true },
		reviews_ratings: [
			{
				customer_name: String,
				customer_email: String,
				rating: Number,
				review: String,
			},
		],
		stock_available: { type: Number, required: true },
		sold_quantity: { type: Number, required: true },
		additional_info: {
			description: { type: String, required: true },
			weight: { type: Number, required: true },
			tags: { type: String, required: true },
		},
		product_status: { type: String, required: true },
		product_type: { type: String, required: true },
		author_info: {
			author_id: { type: String, required: true },
			author_email: { type: String, required: true },
			author_image: { type: String, required: true },
		},
	},
	{ timestamps: true }
);

const LimitedProducts =
	mongoose.models.LimitedProduct ||
	mongoose.model('LimitedProduct', productSchema);
export default LimitedProducts;
