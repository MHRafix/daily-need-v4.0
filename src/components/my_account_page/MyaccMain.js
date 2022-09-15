import React from "react";
import Breadcrumb from "../commons/Breadcrumb/Breadcrumb";
import LoginMain from "./LoginMain";

export default function MyaccMain() {
  const bread_string = "My Account";
  return (
    <>
      <Breadcrumb bread_nav={bread_string} />
      {/* <div id="account_switcher_wrapper">
        <button id="account_switch_btn">Customer Account</button>
        &nbsp; &nbsp; &nbsp;
        <button id="account_switch_btn">Vendor Account</button>
      </div> */}
      <br />
      <LoginMain />
    </>
  );
}
