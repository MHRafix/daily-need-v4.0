import Cookie from "js-cookie";
import React from "react";
import AdminPannelLayoutContainer from "../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import ManageStockProductsMain from "../../../../../components/admin_pannel_components/components/manage_products/manage_stock_products/ManageStockProductsMain";
import ErrorPage from "../../../../404";

export default function InventoryManagement() {
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
        title="Manage Inventory"
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <ManageStockProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
