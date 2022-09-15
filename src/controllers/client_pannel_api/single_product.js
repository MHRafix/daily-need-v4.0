/**
 * single product api controller
 */

import AllProducts from '../../../models/AllProducts';
import db from '../../utilities/database';

export const singleProduct = async (req, res) => {
	const { product_slug } = req.query;
	await db.connect();

	// find all products
	const single_product = await AllProducts.find({ slug: product_slug });

	await db.disconnect();

	// response back
	if (single_product.length) {
		res.status(200).json(single_product[0]);
	} else {
		res.status(404).json({ error: 'Product is not found!' });
	}
};
