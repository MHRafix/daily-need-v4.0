/**
 * verfiy user controller
 */

import bcrypt from 'bcryptjs';
import User from '../../../models/Users';
import db from '../../utilities/database';

export const verifyUser = async (req, res) => {
	await db.connect();
	const user = await User.findOne({ user_email: req.body.useremail });
	await db.disconnect();

	// verify here
	if (user && bcrypt.compareSync(req.body.verifypass, user.user_password)) {
		// response back
		res.status(200).json({
			verify: true,
			success: "You're verified for 24 hours!",
		});
	} else {
		res.status(403).json({ error: 'Opps, incorrect password!' });
	}
};
