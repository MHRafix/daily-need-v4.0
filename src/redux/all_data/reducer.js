// import { addAllProducts } from "./action";

import {
	addAccess,
	addProducts,
	addReview,
	storeCategories,
	storeReviews,
	trackOrder,
} from './action';

const initialState = {
	all_products: [],
	all_categories: [],
	all_reviews: [],
	track_result: {},
	cm_access: false,
};

export default function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case addProducts.ADD_PRODUCTS: {
			const products = payload;
			return { ...state, all_products: products };
		}

		case storeCategories.STORE_CATEGORIES: {
			const categories = payload;
			return { ...state, all_categories: categories };
		}

		case storeReviews.STORE_REVIEWS: {
			const reviews = payload;
			return { ...state, all_reviews: reviews };
		}

		case addReview.ADD_REVIEW: {
			const new_review = [...state.all_reviews, payload];
			return { ...state, all_reviews: new_review };
		}

		case addAccess.ADD_ACCESS: {
			return { ...state, cm_access: payload };
		}

		case trackOrder.TRACK_ORDER: {
			return { ...state, track_result: payload };
		}
		default:
			return state;
	}
}
