import nc from 'next-connect';
import Order from '../../../../../models/AllOrders';
import db from '../../../../utilities/database';

// products getting function here
const handler = nc();

handler.get(async (req, res) => {
	await db.connect();
	const all_orders = await Order.find({});
	await db.disconnect();

	// send response
	if (all_orders.length) {
		// send data response
		res.status(200).json(all_orders);
	} else {
		// send error
		res.status(404).json({ error: 'Opps, no result found!' });
	}
});

// function export here
export default handler;
