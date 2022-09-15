/**
 * all orders controller
 */

import Order from '../../../models/AllOrders';
import db from '../../../models/db';

export const allOrders = async (req, res) => {
	await db.connect();
	const all_orders = await Order.find({});
	await db.disconnect();

	// response back
	if (all_orders.length) {
		res.status(200).json(all_orders);
	} else {
		res.status(404).json({ error: 'No orders found!' });
	}
};
