import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";
import AllProductsContent from "./AllProductsContent";

export default function AllProductsMain({ all_products, all_categories }) {
  const bread_nav = "manage products / all products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage all products"
        breadcrumb_name={bread_nav}
      />
      <AllProductsContent
        all_products={all_products}
        all_categories={all_categories}
      />
    </>
  );
}
