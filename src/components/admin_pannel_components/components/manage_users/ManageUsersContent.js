import React, { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import useDeleteReq from "../../../../hooks/http_req/deleteReq";
import AddUserForm from "../../../../lib/Formik/Forms/user_form/AddUserForm";
import Table from "../../../../lib/Tables/table/Table";
import { UserTableConfig } from "../../../../lib/Tables/table_config/TableColumns";
import AlertToast from "../../../../utilities/alertToast/AlertToast";
import toastConfig from "../../../../utilities/toastConfig";
import DashboardContentLayout from "../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout";

export default function ManageUsersContent({ all_users }) {
  const [data, setData] = useState(all_users);
  const [active, setActive] = useState("reset");
  const [show, setShow] = useState(false);

  // delete hook
  const { toastOn, setToastOn, toastType, toastText, handleDelete } =
    useDeleteReq();

  // users table config
  const { UserTableColumns } = UserTableConfig(handleDelete);

  // toast config
  const { toast_config } = toastConfig(setToastOn, toastType, toastText);

  // handle search filtering
  const handleSearchFilter = (e) => {
    const search_res = all_users.filter((user) =>
      user.user_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(search_res);
  };

  // filter function here
  const handleUserFilter = (role, activer) => {
    const filtered_user = all_users?.filter((user) => user.user_admin === role);
    setActive(activer);
    setData(filtered_user);
  };

  // reset filter
  const handleResetFilter = (activer) => {
    setActive(activer);
    setData(all_users);
  };

  // sorting dependency
  const sorting_dependency = {
    handleSearchFilter,
    handleUserFilter,
    handleResetFilter,
    active,
  };

  // handle add item form show
  const handleAddFormShow = () => {
    setShow(() => (show ? false : true));
  };

  return (
    <>
      {/* alert toast here  */}
      {toastOn && <AlertToast toast_config={toast_config} />}

      {show && (
        <div className="dashboard_row_wrapper">
          <AddUserForm show={show} handleAddFormShow={handleAddFormShow} />
        </div>
      )}

      <div className="dashboard_row_wrapper">
        <DashboardContentLayout
          item_name="all users table"
          btn_content={!show && <FiUserPlus />}
          btn_id={!show && "expand_btn"}
          handleAddItem={handleAddFormShow}
        >
          <Table
            table_columns={UserTableColumns}
            table_data={data}
            sorting_dependency={sorting_dependency}
            sorter={false}
          />
        </DashboardContentLayout>
      </div>
    </>
  );
}
