/**
 * track orders api controller
 */

import Order from '../../../models/AllOrders';
import db from '../../utilities/database';

export const trackOrder = async (req, res) => {
	const { order_id } = req.query;
	await db.connect();
	const result = await Order.findById({ _id: order_id });
	await db.disconnect();

	// send response
	if (result) {
		// data response
		res.status(200).json(result); // send all orders data
	} else {
		// error response
		res.status(404).json({ error: 'Opps, no result found!' });
	}
};
