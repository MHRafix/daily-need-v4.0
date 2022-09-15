/**
 * all reviews controller
 */

import Reviews from '../../../models/Reviews';
import db from '../../utilities/database';

export const allReviews = async (req, res) => {
	await db.connect();
	const all_reviews = await Reviews.find({});
	await db.disconnect();

	if (all_reviews.length) {
		res.status(200).json(all_reviews);
	} else {
		res.status(404).json({ error: 'No reviews found!' });
	}
};
