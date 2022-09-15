import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../../../models/Users";
import { signToken } from "../../../../utilities/auth";
import db from "../../../../utilities/database";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ user_email: req?.body?.user_email });
  await db.disconnect();

  if (user) {
    if (user.user_admin) {
      // check authentication
      const match = await bcrypt.compare(
        req?.body?.user_password,
        user?.user_password
      );

      if (match) {
        // generate jwt token here
        const token = signToken(user);
        res.status(202).send({
          token,
          _id: user._id,
          user_name: user.user_name,
          user_email: user.user_email,
          user_admin: user.user_admin,
          user_pic: user.user_pic,
          success: "Admin Login successfull!",
        });
      } else {
        res.send({ error: "Opps, incorrect password!" });
      }
    } else {
      res.send({ error: "Opps, not an admin email!" });
    }
  } else {
    res.send({ error: "Invalid email and password!" });
  }
});

export default handler;
