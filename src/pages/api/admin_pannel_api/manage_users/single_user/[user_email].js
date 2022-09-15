import nc from 'next-connect';
import User from '../../../../../../models/Users';
import db from '../../../../../utilities/database';

const handler = nc();

handler.get(async (req, res) => {
	const { user_email } = req.query;
	await db.connect();
	const admin_user = await User.findOne({
		user_email: user_email,
		user_role: 'admin',
	});
	await db.disconnect();
	if (admin_user) {
		res.status(200).send(admin_user);
	} else {
		res.status(404).json({ error: 'This user is not an admin!' });
	}
});
export default handler;
