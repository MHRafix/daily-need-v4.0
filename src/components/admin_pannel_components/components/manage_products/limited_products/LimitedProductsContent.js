import { Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import AlertToast from "../../../../../utilities/alertToast/AlertToast";
import AddLimitedProductsForm from "../../../../../utilities/Formik/Forms/AddLimitedProductsForm";
import { AddLimitedProductsFormValidator } from "../../../../../utilities/Formik/Validators/AllFormValidators";
import LimitedOffersTable from "../../../../../utilities/React_Table/LimitedOffersProductsTable/LimitedOffersTable";
import toastConfig from "../../../../../utilities/toastConfig";
import DashboardContentLayout from "../../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout";

export default function LimitedProductsContent({ limited_products }) {
  const all_categories = useSelector((state) => state.products.all_categories);

  const {
    initialValues,
    validationSchema,
    onSubmit,
    setThumbnail,
    setBigThumbnail,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
  } = AddLimitedProductsFormValidator();

  // toast config
  const { toast_config } = toastConfig(setToastOn, toastType, toastText);

  return (
    <>
      {/* message toast alert */}
      {toastOn && <AlertToast toast_config={toast_config} />}

      {/* add limited offer's products form  */}
      <div className="dashboard_row_wrapper">
        <div className="add_products_form">
          <DashboardContentLayout item_name="add limited products">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <AddLimitedProductsForm
                setThumbnail={setThumbnail}
                setBigThumbnail={setBigThumbnail}
                processing={processing}
                all_categories={all_categories}
              />
            </Formik>
          </DashboardContentLayout>
        </div>
      </div>

      {/* limites offers products table here */}
      <div className="dashboard_row_wrapper">
        <div className="add_products_form">
          <DashboardContentLayout item_name="limited products table">
            <LimitedOffersTable PRODUCTS_DATA={limited_products} />
          </DashboardContentLayout>
        </div>
      </div>
    </>
  );
}
