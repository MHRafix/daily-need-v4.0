/**
 * place order controller
 */

import Order from '../../../models/AllOrders';
import db from '../../utilities/database';

export const placeOrder = async (req, res) => {
	await db.connect();

	const order_data = req.body;

	const newOrder = new Order(order_data);
	const placed = await newOrder.save();

	await db.disconnect();

	// response back
	if (placed) {
		res.status(200).json({
			success: 'Your order successfully placed!',
			order_id: newOrder._id,
		});
	} else {
		// error throw
		res.status(404).json({ error: 'Opps, something wrong!' });
	}
};
