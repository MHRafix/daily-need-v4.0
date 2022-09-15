/**
 * shipped orders api controller
 */

import Order from '../../../models/AllOrders';
import db from '../../utilities/database';

export const shippedOrders = async (req, res) => {
	const user_email = req.query;
	await db.connect();
	const all_orders = await Order.find({ user_email }); // all orders
	await db.disconnect();

	// shipped orders
	const shipped_orders = all_orders.filter(
		(order) => order.order_overview.order_status === 'shipped'
	);

	// send response
	if (shipped_orders.length) {
		// data response
		res.status(200).json(shipped_orders);
	} else {
		// error response
		res.status(404).json({ error: 'Opps, no completed orders found!' });
	}
};
