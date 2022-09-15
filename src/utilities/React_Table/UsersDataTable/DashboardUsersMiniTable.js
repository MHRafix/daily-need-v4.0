import React from "react";
import DashboardContentLayout from "../../../components/admin_pannel_components/admin_pannel_utilities/DashboardLayout/DashboardContentLayout";
import UsersTable from "./UsersTable";

export default function DashboardUsersMiniTable({ item_name, users_data }) {
  return (
    <>
      <DashboardContentLayout item_name={item_name}>
        <UsersTable USER_DATA={users_data} />
      </DashboardContentLayout>
    </>
  );
}
