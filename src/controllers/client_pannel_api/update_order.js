/**
 * update order controller
 */

import Order from '../../../models/AllOrders';
import db from '../../utilities/database';

export const updateOrder = async (req, res) => {
	await db.connect();
	const req_data = req.body;
	const single_order = await Order.findOne({ _id: req_data.order_id });

	// response back
	if (single_order) {
		single_order.order_overview.order_status = 'inprogress';

		single_order.payment_info.payment_method = req_data.payment_method;
		single_order.payment_info.payment_status = req_data.payment_status;
		single_order.payment_info.customer_name = req_data.customer_name;
		single_order.payment_info.customer_email = req_data.customer_email;
		single_order.payment_info.customer_phone = req_data.customer_phone;
		single_order.payment_info.payment_amount = req_data.payment_amount;
		single_order.payment_info.card_name = req_data.card_name;
		single_order.payment_info.created = req_data.created;
		single_order.payment_info.last4 = req_data.last4;
		single_order.payment_info.transaction = req_data.transaction;
		single_order.payment_info.order_id = req_data.order_id;

		// console.log("from update order", single_order);
		await single_order.save();
		await db.disconnect();
		res.status(200).json(single_order);
	} else {
		res.status(404).json({ error: 'Opps, something wrong!' });
	}
};
