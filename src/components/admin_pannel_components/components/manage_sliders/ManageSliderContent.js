import { Form, Formik } from "formik";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
import AlertToast from "../../../../utilities/alertToast/AlertToast";
import {
  FormButton,
  FormikFileField,
  FormikTextField,
} from "../../../../utilities/Form/FormField";
import {
  AddBrandSliderFormValidator,
  AddHomeSliderFormValidator,
} from "../../../../utilities/Formik/Validators/AllFormValidators";
import DashboardContentLayout from "../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout";

export default function ManageSliderContent() {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    setSliderImg,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
  } = AddHomeSliderFormValidator();

  const {
    initialValuesBrand,
    validationSchemaBrand,
    onSubmitBrand,
    setBrandImg,
    processingBrand,
    toastTextBrand,
    toastTypeBrand,
    toastOnBrand,
    setToastOnBrand,
  } = AddBrandSliderFormValidator();

  // handle close toast here
  const handleRemoveToast = () => {
    setToastOn(false);
    setToastOnBrand(false);
  };

  // auto close toast after ther 5000ms delay
  if (toastOn) {
    setTimeout(() => {
      if (toastOn) {
        setToastOn(false);
      } else {
        setToastOnBrand(false);
      }
    }, 5000);
  }

  // toast setting configuration here
  const toast_config = {
    toastStyle: toastType || toastTypeBrand,
    alertText: toastText || toastTextBrand,
    toastIcon:
      toastType || toastTypeBrand === "error_toast" ? (
        <BiErrorCircle />
      ) : (
        <MdCloudDone />
      ),

    handleRemoveToast: handleRemoveToast,
  };

  return (
    <>
      {/* alert toast here  */}
      {toastOn && <AlertToast toast_config={toast_config} />}
      {toastOnBrand && <AlertToast toast_config={toast_config} />}
      {/* add home slider image  */}
      <div className="dashboard_row_wrapper">
        <DashboardContentLayout item_name="add home slider image">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <FormikTextField
                form_label="image name"
                type="text"
                name="image_name"
              />
              <FormikFileField
                form_label="slider image"
                setState={setSliderImg}
                type="file"
                name="slider_image"
                required={true}
              />
              <br />
              <FormButton
                type="submit"
                btn_name="Add Slider Image"
                processing={processing}
              />
            </Form>
          </Formik>
        </DashboardContentLayout>
      </div>
      {/* add brand slider image  */}
      <div className="dashboard_row_wrapper">
        <DashboardContentLayout item_name="add brand image">
          <Formik
            initialValues={initialValuesBrand}
            validationSchema={validationSchemaBrand}
            onSubmit={onSubmitBrand}
          >
            <Form>
              <FormikTextField
                form_label="brand name"
                type="text"
                name="brand_name"
              />
              <FormikFileField
                form_label="brand image"
                setState={setBrandImg}
                type="file"
                name="brand_image"
                required={true}
              />
              <br />
              <FormButton
                type="submit"
                btn_name="Add Brand Image"
                processing={processingBrand}
              />
            </Form>
          </Formik>
        </DashboardContentLayout>
      </div>
    </>
  );
}
