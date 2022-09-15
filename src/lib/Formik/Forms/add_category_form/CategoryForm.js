import { Form, Formik } from "formik";
import React from "react";
import { AddCategoryFormValidator } from "../../../../lib/Formik/Validators/AllFormValidators";
import AlertToast from "../../../../utilities/alertToast/AlertToast";
import toastConfig from "../../../../utilities/toastConfig";
import {
  FormButton,
  FormikFileField,
  FormikTextField,
} from "../../FormFields/FormField";
export default function CategoryForm() {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    setCatImg,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
  } = AddCategoryFormValidator();

  // toast config
  const { toast_config } = toastConfig(setToastOn, toastType, toastText);

  return (
    <>
      {/* alert toast here  */}
      {toastOn && <AlertToast toast_config={toast_config} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormikTextField
            form_label="category name"
            type="text"
            name="cat_name"
          />
          <FormikFileField
            form_label="category image"
            setState={setCatImg}
            type="file"
            name="cat_image"
            required={true}
          />
          <br />
          <FormButton
            type="submit"
            btn_name="Add Category"
            processing={processing}
          />
        </Form>
      </Formik>
    </>
  );
}
