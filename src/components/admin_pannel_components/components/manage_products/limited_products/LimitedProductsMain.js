import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";
import LimitedProductsContent from "./LimitedProductsContent";

export default function LimitedProductsMain({ limited_products }) {
  const bread_nav = "manage products / limited products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage limited products"
        breadcrumb_name={bread_nav}
      />
      <LimitedProductsContent limited_products={limited_products} />
    </>
  );
}
