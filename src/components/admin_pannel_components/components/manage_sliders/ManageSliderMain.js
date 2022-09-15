import React from "react";
import AdminPannelBreadcrumb from "../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";
import ManageSliderContent from "./ManageSliderContent";

export default function ManageSliderMain() {
  const bread_nav = "manage sliders / manage sliders";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage sliders"
        breadcrumb_name={bread_nav}
      />
      <ManageSliderContent />
    </>
  );
}
