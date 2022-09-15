/**
 * my orders api controller
 */

import Order from '../../../models/AllOrders';
import db from '../../utilities/database';

export const myOrders = async (req, res) => {
	const { user_email } = req.query;
	await db.connect();
	const all_orders = await Order.find({ user_email });
	await db.disconnect();

	// response back
	if (all_orders.length) {
		res.status(200).json(all_orders);
	} else {
		res.status(404).json({ error: 'You have no order!' });
	}
};
