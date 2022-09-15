/**
 * all products controller
 */

import AllProducts from '../../../models/AllProducts';
import db from '../../utilities/database';

export const allProducts = async (req, res) => {
	await db.connect();
	const products = await AllProducts.find({});
	await db.disconnect();

	if (products.length) {
		res.status(200).send(products);
	} else {
		res.status(404).json({ error: 'No products found!' });
	}
};
