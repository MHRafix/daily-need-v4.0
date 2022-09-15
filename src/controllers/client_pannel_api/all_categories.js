/**
 * all categories controller
 */

import Category from '../../../models/Category';
import db from '../../utilities/database';

export const allCategories = async (req, res) => {
	await db.connect();
	const categories = await Category.find({});
	await db.disconnect();

	if (categories.length) {
		res.status(200).send(categories);
	}
};
