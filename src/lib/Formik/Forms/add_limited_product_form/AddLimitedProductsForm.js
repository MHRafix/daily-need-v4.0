import { Form } from "formik";
import React from "react";
import {
  FormButton,
  FormikFileField,
  FormikSelectField,
  FormikTextField,
} from "../../FormFields/FormField";
import FormFieldFlexLayout from "../../FormikLayout/FormFieldFlexLayout";

export default function AddLimitedProductsForm({
  setThumbnail,
  setBigThumbnail,
  processing,
  all_categories,
}) {
  return (
    <Form>
      <FormikTextField form_label="product title" type="text" name="title" />
      <FormFieldFlexLayout>
        <FormikTextField form_label="product slug" type="text" name="slug" />
        <FormikTextField
          form_label="offer end time"
          type="date"
          name="offer_end"
        />
      </FormFieldFlexLayout>

      <FormFieldFlexLayout>
        <FormikTextField
          form_label="regular price"
          type="number"
          name="regular_price"
        />

        <FormikTextField
          form_label="sale price"
          type="number"
          name="sale_price"
        />
      </FormFieldFlexLayout>

      <FormFieldFlexLayout>
        <FormikSelectField
          form_label="product category"
          options={all_categories}
          name="category"
        />
        <FormikTextField
          form_label="stock available"
          type="number"
          name="stock_available"
        />
      </FormFieldFlexLayout>

      <FormFieldFlexLayout>
        <FormikFileField
          form_label="product thumbnail"
          setState={setThumbnail}
          type="file"
          name="thumbnail"
          required={true}
        />

        <FormikFileField
          form_label="product big thumbnail"
          setState={setBigThumbnail}
          type="file"
          name="thumbnail_big"
          required={true}
        />
      </FormFieldFlexLayout>

      <FormFieldFlexLayout>
        <FormikTextField form_label="weight" type="number" name="weight" />
        <FormikTextField form_label="tags" type="text" name="tags" />
      </FormFieldFlexLayout>

      <FormikTextField
        form_label="description"
        type="text"
        name="description"
        as="textarea"
      />

      <FormButton
        type="submit"
        btn_name="Add Product"
        processing={processing}
      />
    </Form>
  );
}
