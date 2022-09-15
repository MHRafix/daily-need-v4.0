import nc from "next-connect";
import Category from "../../../../../models/Category";
import db from "../../../../utilities/database";

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const isExistCategory = await Category.find({
    cat_name: req.body.cat_name,
  });

  // conbditionaly categroy create here
  if (isExistCategory.length) {
    res.send({ error: "Change category and try again!" });
  } else {
    // create new category
    const newCat = new Category({
      category: req.body.cat_name,
      cat_name2: req.body.cat_name,
      cat_name: req.body.cat_name,
      cat_image: req.body.cat_image,
    });

    const category = await newCat.save(); // save cat to database
    await db.disconnect();

    if (category) {
      res.status(201).send({ success: "Category successfully created!" });
    }
  }
});

export default handler;
