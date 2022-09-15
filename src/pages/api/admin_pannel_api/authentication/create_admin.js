import nc from "next-connect";
import User from "../../../../../models/Users";
import db from "../../../../utilities/database";

const handler = nc();

handler.post(async (req, res) => {
  // find the existed user
  const req_data = req.body;
  await db.connect();
  const user = await User.findOne({
    user_email: req_data.user_email,
    user_admin: false,
  });

  if (user) {
    console.log(user);
    // update the existed user role here
    if (
      user.user_name === req_data.user_name &&
      user.user_email === req_data.user_email &&
      user.user_admin === false
    ) {
      user.user_admin = true;

      await user.save();
      await db.disconnect();
      res.status(202).send({
        success: "User successfully converted to an admin!",
      });
    }
  } else {
    res.send({ error: "Opps, wrong user!" });
  }
});

export default handler;
