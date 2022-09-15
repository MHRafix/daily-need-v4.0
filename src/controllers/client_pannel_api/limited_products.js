/**
 * limited products controller
 */

import LimitedProducts from '../../../models/LimitedProducts';
import db from '../../utilities/database';

export const limitedProducts = async (req, res) => {
	await db.connect();
	const products = await LimitedProducts.find({});
	await db.disconnect();

	// response back
	if (products.length) {
		res.status(200).json(products);
	} else {
		res.status(404).json({ error: 'No products found!' });
	}
};
