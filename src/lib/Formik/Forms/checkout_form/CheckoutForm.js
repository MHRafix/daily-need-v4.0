import { Form } from "formik";
import React from "react";
import {
  FormButton,
  FormikSelectField,
  FormikTextField,
} from "../../FormFields/FormField";

export default function CheckoutForm({ processing }) {
  return (
    <Form>
      <FormikTextField
        form_label="your name"
        type="text"
        name="customer_name"
      />

      <FormikTextField
        form_label="your email"
        type="email"
        name="customer_email"
      />

      <FormikTextField
        form_label="your mobile"
        type="tel"
        name="customer_mobile"
      />

      <FormikTextField
        form_label="your country"
        type="text"
        name="customer_country"
      />
      <FormikTextField
        form_label="your district"
        type="text"
        name="customer_district"
      />
      <FormikTextField
        form_label="your street"
        type="text"
        name="customer_street"
      />

      <FormikSelectField
        form_label="payment method"
        options={[{ category: "cash-on" }, { category: "stripe card" }]}
        name="payment_method"
      />

      <FormButton
        type="submit"
        btn_name="place order"
        processing={processing}
      />
    </Form>
  );
}
