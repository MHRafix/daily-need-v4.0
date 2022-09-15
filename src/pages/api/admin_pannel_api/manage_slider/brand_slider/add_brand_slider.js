import nc from "next-connect";
import BrandSlider from "../../../../../../models/BrandSlider";
import db from "../../../../../utilities/database";

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();

  // create new brand slider image
  const newSlider = new BrandSlider({
    brand_name: req.body.brand_name,
    brand_image: req.body.brand_image,
  });

  const slider = await newSlider.save(); // save brand slider to database
  await db.disconnect();

  if (slider) {
    res
      .status(201)
      .send({ success: "Image successfully added to brand slider!" });
  } else {
    res.send({ error: "Opps, something went wrong!" });
  }
});

export default handler;
