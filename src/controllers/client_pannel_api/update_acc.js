/**
 * update acc details
 */

import bcrypt from 'bcryptjs';
import User from '../../../models/Users';
import { signToken } from '../../utilities/auth';
import db from '../../utilities/database';

export const updateAccDetails = async (req, res) => {
	// find the existed user
	const req_data = req.body;
	await db.connect();
	const user = await User.findOne({ user_email: req_data.user_email });

	if (user) {
		// update the existed user details here
		if (
			user.user_name === req_data.user_name &&
			req_data.user_password === '' &&
			req_data.user_pic === ''
		) {
			res.send({ error: 'Please change the details!' });
		} else {
			if (user.user_name !== req_data.user_name) {
				user.user_name = req_data.user_name;
			}

			if (req_data.user_password) {
				user.user_password = bcrypt.hashSync(req_data.user_password);
			}

			if (user.user_pic !== req_data.user_pic) {
				user.user_pic = req_data.user_pic;
			}

			await user.save();
			await db.disconnect();

			// make the jwt token with new details of user
			const token = signToken(user);
			res.status(202).send({
				token,
				_id: user._id,
				user_name: user.user_name,
				user_email: user.user_email,
				user_admin: user.user_admin,
				user_pic: user.user_pic,
				success: 'User details successfully updated!',
			});
		}
	} else {
		res.send({ error: 'Opps, something wrong!' });
	}
};
