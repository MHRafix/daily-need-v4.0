import nc from "next-connect";
import User from "../../../../../../models/Users";
import db from "../../../../../utilities/database";

const handler = nc();

handler.delete(async (req, res) => {
  const { user_id } = req.query;
  await db.connect();
  const deleted = await User.deleteOne({ _id: user_id });
  await db.disconnect();
  if (deleted.deletedCount > 0) {
    res.status(200).json({ success: "User deleted successfully!" });
  } else {
    res.json({ error: "Opps, something went wrong inprocess!" });
  }
});
export default handler;
