import React, { useState } from "react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import useModalFilter from "../../../../../hooks/filter_func/useModalFilter";
import useDeleteReq from "../../../../../hooks/http_req/deleteReq";
import AddProductsFormMain from "../../../../../lib/Formik/Forms/add_product_form/AddProductsFormMain";
import Table from "../../../../../lib/Tables/table/Table";
import { ProductTableConfig } from "../../../../../lib/Tables/table_config/TableColumns";
import AlertToast from "../../../../../utilities/alertToast/AlertToast";
import toastConfig from "../../../../../utilities/toastConfig";
import DashboardContentLayout from "../../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout";

export default function AllProductsContent({ all_products, all_categories }) {
  // initialize filter and sorting dependency
  const [filterData, setFilterData] = useState(all_products);
  const { show, sorting_dependency, handleAddFormShow } = useModalFilter(
    all_products,
    setFilterData
  );

  // delete hook
  const { toastOn, setToastOn, toastType, toastText, handleDelete } =
    useDeleteReq();

  // users table config
  const { ProductTableColumns } = ProductTableConfig(handleDelete);

  // toast config
  const { toast_config } = toastConfig(setToastOn, toastType, toastText);

  return (
    <>
      {toastOn && <AlertToast toast_config={toast_config} />}
      {/* add products form  */}
      {show && (
        <div className="dashboard_row_wrapper">
          <div className="add_products_form">
            <AddProductsFormMain
              show={show}
              handleAddFormShow={handleAddFormShow}
              all_categories={all_categories}
            />
          </div>
        </div>
      )}

      {/* all products managing table */}
      <div className="dashboard_row_wrapper">
        <div className="manage_products_table">
          <DashboardContentLayout
            item_name="all products table"
            btn_content={!show && <HiOutlineViewGridAdd />}
            btn_id={!show && "expand_btn"}
            handleAddItem={handleAddFormShow}
          >
            <Table
              table_columns={ProductTableColumns}
              table_data={filterData}
              sorting_dependency={sorting_dependency}
              sorter={true}
              isProduct={true}
            />
          </DashboardContentLayout>
        </div>
      </div>
    </>
  );
}
