/**
 * add review controller
 */

import Reviews from '../../../models/Reviews';
import db from '../../utilities/database';

export const addReview = async (req, res) => {
	await db.connect();

	// create review
	const newReview = new Reviews(req.body);
	const added = await newReview.save();
	await db.disconnect();

	// response back
	if (added) {
		res.status(201).json({ success: 'Review sent successfully!' });
	} else {
		res.status(403).json({ error: 'Opps, something went wrong!' });
	}
};
