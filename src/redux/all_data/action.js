// store all products type
export const addProducts = {
	ADD_PRODUCTS: 'ADD_PRODUCTS',
};

// store all categories type
export const storeCategories = {
	STORE_CATEGORIES: 'STORE_CATEGORIES',
};

// store all reviews type
export const storeReviews = {
	STORE_REVIEWS: 'STORE_REVIEWS',
};

// add review type
export const addReview = {
	ADD_REVIEW: 'ADD_REVIEW',
};

// is validate customer type
export const addAccess = {
	ADD_ACCESS: 'ADD_ACCESS',
};

// track order data type
export const trackOrder = {
	TRACK_ORDER: 'TRACK_ORDER',
};

// store all products action
export const addAllProducts = (products) => {
	return { type: addProducts.ADD_PRODUCTS, payload: products };
};

// store all categories action
export const storeAllCategories = (categories) => {
	return { type: storeCategories.STORE_CATEGORIES, payload: categories };
};

// store all reviews action
export const storeAllReviews = (reviews) => {
	return { type: storeReviews.STORE_REVIEWS, payload: reviews };
};

// add new review action
export const addSingleReview = (review) => {
	return { type: addReview.ADD_REVIEW, payload: review };
};

// is validate customer action
export const addCutomerAccess = (access) => {
	return { type: addAccess.ADD_ACCESS, payload: access };
};

// track order data action
export const storeTrackOrder = (data) => {
	return { type: trackOrder.TRACK_ORDER, payload: data };
};
