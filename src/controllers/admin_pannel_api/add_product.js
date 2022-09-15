/**
 * add product api controller
 */

import AllProducts from '../../../models/AllProducts';
import db from '../../utilities/database';

export const addProducts = async (req, res) => {
	await db.connect();
	if (req.body) {
		// create product
		const newProduct = new AllProducts(req.body);
		const added = await newProduct.save();
		await db.disconnect();

		// conditionaly send response
		if (added) {
			res.status(201).send({ success: 'Product added successfully!' });
		} else {
			res.send({ error: 'Opps, something wrong!' });
		}
	} else {
		res.send({ error: 'Please check your internet!' });
	}
};
