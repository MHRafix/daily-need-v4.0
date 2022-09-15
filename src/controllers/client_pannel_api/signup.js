/**
 * sign up controller
 */

import bcrypt from 'bcryptjs';
import User from '../../../models/Users';
import { signToken } from "../../utilities/auth";
import db from '../../utilities/database';

export const userSignup = async (req, res) => {
	await db.connect();
	const all_users = await User.find({});

	const exist = all_users.find(
		(user) => user.user_email === req.body.user_email
	);

	if (exist) {
		res.send({ error: 'User email is already in use!' });
	} else {
		// create user
		const newUser = new User({
			user_name: req.body.user_name,
			user_email: req.body.user_email,
			user_password: bcrypt.hashSync(req.body.user_password),
			user_admin: req.body.user_admin,
			user_pic: req.body.user_pic,
		});

		const user = await newUser.save(); // save user to database
		await db.disconnect();

		// generate token
		const token = signToken(user);

		res.status(201).send({
			token,
			_id: user._id,
			user_name: user.user_name,
			user_email: user.user_email,
			user_admin: user.user_admin,
			user_role: user.user_role,
			user_pic: user.user_pic,
			success: 'Account created successfully!',
		});
	}
};
