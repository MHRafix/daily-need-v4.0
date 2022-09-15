import nc from "next-connect";
import HomeSlider from "../../../../../../models/HomeSlider";
import db from "../../../../../utilities/database";

const handler = nc();

handler.delete(async (req, res) => {
  const { slider_id } = req.query;
  await db.connect();
  const delete_slider = await HomeSlider.deleteOne({ _id: slider_id });
  await db.disconnect();
  if (delete_slider) {
    res
      .status(202)
      .send({ success: "Home slider image deleted successfully!" });
  } else {
    res.send({ error: "Opps, something went wrong!" });
  }
});
export default handler;
