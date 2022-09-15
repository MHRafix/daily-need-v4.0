import React from "react";
import AdminPannelBreadcrumb from "../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";
import ManageUsersContent from "./ManageUsersContent";

export default function ManageAllUsersMain({ all_users }) {
  const bread_nav = "manage users / all users";
  return (
    <div>
      <AdminPannelBreadcrumb
        page_name="manage users"
        breadcrumb_name={bread_nav}
      />
      <ManageUsersContent all_users={all_users} />
    </div>
  );
}
