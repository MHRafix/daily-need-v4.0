/**
 * sale product api controller
 */

import AllProducts from '../../../models/AllProducts';
import db from '../../utilities/database';

export const saleProduct = async (req, res) => {
	await db.connect();

	// find all products
	const products = await AllProducts.find({});

	// findout sale products
	const sale_products = products.filter(
		(product) => product.prices.sale_price !== 0
	);

	await db.disconnect();

	// response back
	if (sale_products.length) {
		res.status(200).json(sale_products);
	} else {
		res.status(404).json({ error: 'Opps, no result found!' });
	}
};
