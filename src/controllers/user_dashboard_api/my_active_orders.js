/**
 * my active order api controller
 */

import Order from '../../../models/AllOrders';
import db from '../../utilities/database';

export const myActiveOrders = async (req, res) => {
	const { user_email } = req.query;
	await db.connect();
	const all_orders = await Order.find({ user_email }); // all order of the requested user
	await db.disconnect();

	// find out active orders from all orders
	if (all_orders.length) {
		const active_orders = all_orders.filter(
			(order) =>
				order.order_overview.order_status === 'pendding' ||
				order.order_overview.order_status === 'inprogress'
		);

		// send response
		if (active_orders.length) {
			// send data response
			res.status(200).json(active_orders);
		} else {
			// send error response
			res.status(404).send([]);
		}
	} else {
		// send error response
		res.status(404).send([]);
	}
};
