import React from "react";
import AdminPannelBreadcrumb from "../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";
import AdminDashboardContent from "./AdminDashboardContent";

export default function AdminDashboardMain({
  all_orders,
  all_users,
  all_products,
}) {
  return (
    <>
      {/* breadcrunb */}
      <AdminPannelBreadcrumb page_name="admin dashboard" />

      {/* others content  */}
      <AdminDashboardContent
        all_orders={all_orders}
        all_users={all_users}
        all_products={all_products}
      />
    </>
  );
}
