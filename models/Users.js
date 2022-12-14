import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		user_name: { type: String, required: true },
		user_email: { type: String, required: true },
		user_password: { type: String, required: true },
		user_role: { type: String, default: 'customer' }, // customer || admin || moderator
		user_pic: { type: String, required: true },
	},
	{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', productSchema);
export default User;
