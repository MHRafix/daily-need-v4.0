import nc from "next-connect";
import BrandSlider from "../../../../../../models/BrandSlider";
import db from "../../../../../utilities/database";

const handler = nc();

handler.delete(async (req, res) => {
  const { brand_id } = req.query;
  await db.connect();
  const delete_brand = await BrandSlider.deleteOne({ _id: brand_id });
  await db.disconnect();
  if (delete_brand) {
    res
      .status(202)
      .send({ success: "Brand slider image deleted successfully!" });
  } else {
    res.send({ error: "Opps, something went wrong!" });
  }
});
export default handler;
