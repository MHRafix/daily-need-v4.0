import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function ManageStockProductsMain() {
  const bread_nav = "manage products inventory / manage inventory";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage inventory"
        breadcrumb_name={bread_nav}
      />
    </>
  );
}
