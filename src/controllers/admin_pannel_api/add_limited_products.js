/**]
 * add limited products controller
 */

import LimitedProducts from '../../../models/LimitedProducts';
import db from '../../utilities/database';

export const addLimitedProducts = async (req, res) => {
	await db.connect();

	// create product
	const newProduct = new LimitedProducts(req.body);
	const added = await newProduct.save();
	await db.disconnect();

	// conditionaly send response
	if (added) {
		res.status(201).json({ success: 'Product added successfully!' });
	} else {
		res.status(400).json({ error: 'Opps, something went wrong!' });
	}
};
