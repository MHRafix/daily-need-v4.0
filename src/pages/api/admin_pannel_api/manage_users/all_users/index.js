import nc from 'next-connect';
import User from '../../../../../../models/Users';
import db from '../../../../../utilities/database';

const handler = nc();

handler.get(async (req, res) => {
	await db.connect();
	const all_users = await User.find({});
	await db.disconnect();

	// send response
	if (all_users.length) {
		// send data response
		res.status(200).json(all_users);
	} else {
		// send error response
		res.status(404).json({ error: 'Opps, no result found!' });
	}
});

export default handler;
