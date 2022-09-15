import Cookie from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Category from "../../../../../../models/Category";
import LimitedProducts from "../../../../../../models/LimitedProducts";
import AdminPannelLayoutContainer from "../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import LimitedProductsMain from "../../../../../components/admin_pannel_components/components/manage_products/limited_products/LimitedProductsMain";
import { storeAllCategories } from "../../../../../redux/all_data/action";
import db from "../../../../../utilities/database";
import ErrorPage from "../../../../404";

export default function LimitedProductsPage({
  limited_products,
  all_categories,
}) {
  // categories add to redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storeAllCategories(all_categories));
  });

  // render error page
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  if (!userInfo?.user_admin) {
    return <ErrorPage />;
  }
  return (
    <>
      <AdminPannelLayoutContainer
        title="Manage Products"
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <LimitedProductsMain limited_products={limited_products} />
      </AdminPannelLayoutContainer>
    </>
  );
}

// get shop products from the server
// export async function getServerSideProps() {
//   const products = await fetch(`${process.env.ROOT_URI}/api/limitedproducts`);
//   const categories = await fetch(`${process.env.ROOT_URI}/api/allcategories`);
//   const limited_products = await products.json();
//   const all_categories = await categories.json();

//   // Pass data to the page via props
//   return { props: { limited_products, all_categories } };
// }

export async function getServerSideProps() {
  await db.connect();
  const limited_products = await LimitedProducts.find({});
  const all_categories = await Category.find({});
  await db.disconnect();
  return {
    props: {
      limited_products,
      all_categories,
    },
  };
}
