/**
 * delete review controller
 */

import Reviews from '../../../models/Reviews';
import db from '../../utilities/database';

export const deleteReview = async (req, res) => {
	const { review_id } = req.query;
	await db.connect();
	const delete_review = await Reviews.deleteOne({ _id: review_id });
	await db.disconnect();
	if (delete_review) {
		res.status(202).json({ success: 'Review deleted successfully!' });
	} else {
		res.status(404).json({ error: 'Opps, something went wrong!' });
	}
};
