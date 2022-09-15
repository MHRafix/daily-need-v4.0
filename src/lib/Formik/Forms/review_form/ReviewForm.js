import { Form } from "formik";
import React from "react";
import {
  FormButton,
  FormikFileField,
  FormikTextField,
} from "../../FormFields/FormField";

export default function ReviewForm({ processing, setState }) {
  return (
    <Form>
      <FormikTextField
        form_label="your name"
        type="text"
        name="customer_name"
      />

      <FormikTextField form_label="rating point" type="number" name="rating" />
      <FormikFileField
        form_label="product pic"
        type="file"
        name="product_pic"
        setState={setState}
        required={true}
      />

      <FormikTextField
        form_label="review comment"
        type="textarea"
        name="review"
      />

      <FormButton
        type="submit"
        btn_name="Leave Review"
        processing={processing}
      />
    </Form>
  );
}
