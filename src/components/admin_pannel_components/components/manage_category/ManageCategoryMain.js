import React from "react";
import AdminPannelBreadcrumb from "../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";
import ManageCatgoryContent from "./ManageCatgoryContent";

export default function ManageCategoryMain({ all_products, all_categories }) {
  const bread_nav = "manage category / all category products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage category products"
        breadcrumb_name={bread_nav}
      />
      <ManageCatgoryContent
        all_products={all_products}
        all_categories={all_categories}
      />
    </>
  );
}
