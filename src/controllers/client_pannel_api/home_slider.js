/**
 * home slider controller
 */

import HomeSlider from '../../../models/HomeSlider';
import db from '../../utilities/database';

export const homeSlider = async (req, res) => {
	await db.connect();
	const sliders = await HomeSlider.find({});
	await db.disconnect();
	if (sliders.length) {
		res.status(200).send(sliders);
	} else {
		res.status(404).json({ error: 'No home slider found!' });
	}
};
