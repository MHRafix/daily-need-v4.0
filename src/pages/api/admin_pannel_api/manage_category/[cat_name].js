import nc from "next-connect";
import Category from "../../../../../models/Category";
import db from "../../../../utilities/database";

const handler = nc();

handler.delete(async (req, res) => {
  const { cat_name } = req.query;
  await db.connect();
  const delete_cat = await Category.deleteOne({ cat_name });
  await db.disconnect();
  if (delete_cat) {
    res.status(202).send({ success: "Category deleted successfully!" });
  } else {
    res.send({ error: "Opps, something went wrong!" });
  }
});
export default handler;
