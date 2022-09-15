/**
 * brand slider controller
 */

import BrandSlider from '../../../models/BrandSlider';
import db from '../../utilities/database';

export const brandSlider = async (req, res) => {
	await db.connect();
	const brands = await BrandSlider.find({});
	await db.disconnect();
	if (brands.length) {
		res.status(200).json(brands);
	} else {
		res.status(404).json({ error: 'No brand slider found!' });
	}
};
