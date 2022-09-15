import nc from "next-connect";
import HomeSlider from "../../../../../../models/HomeSlider";
import db from "../../../../../utilities/database";

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();

  // create new slider image
  const newSlider = new HomeSlider({
    image_name: req.body.image_name,
    slider_image: req.body.slider_image,
  });

  const slider = await newSlider.save(); // save cat to database
  await db.disconnect();

  if (slider) {
    res
      .status(201)
      .send({ success: "Image successfully added to home slider!" });
  } else {
    res.send({ error: "Opps, something went wrong!" });
  }
});

export default handler;
