import axios from "axios";
import Cookie from "js-cookie";
import Router from "next/router";

// post req sender here
export const reqSender = async (
  products_data,
  resetForm,
  setProcessing,
  setToastText,
  setToastType,
  setToastOn,
  api_url
) => {
  try {
    const { data } = await axios.post(`/api/${api_url}`, products_data);

    if (data?.success) {
      setProcessing(false);
      setToastType("success_toast");
      setToastOn(true);
      setToastText(data?.success);
      resetForm({ values: "" });
      if (
        api_url === "my_account/signin_api" ||
        api_url === "my_account/signup_api" ||
        api_url === "my_account/update_acc_details" ||
        api_url === "admin_pannel_api/authentication/admin_login"
      ) {
        Cookie.set("user_information", JSON.stringify(data), {
          expires: 30, // 30 days
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        if (data?.user_admin) {
          Cookie.set("lock_screen", JSON.stringify(false), {
            expires: 30, // 30 days
            secure: true,
            sameSite: "strict",
            path: "/",
          });
        }

        // redirect to aspected page
        setTimeout(() => {
          Router.back();
        }, 2000);
      } else if (api_url === "admin_pannel_api/authentication/unlock_screen") {
        Cookie.set("lock_screen", JSON.stringify(false), {
          expires: 30, // 30 days
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        // redirect to aspected page
        setTimeout(() => {
          Router.back();
        }, 2000);
      }
    } else {
      setProcessing(false);
      setToastType("error_toast");
      setToastOn(true);
      setToastText(data?.error);
      resetForm({ values: "" });
    }
  } catch (err) {
    setProcessing(false);
    setToastType("error_toast");
    setToastOn(true);
    setToastText(err.message);
    resetForm({ values: "" });
  }
};

// update req sender here
export const updateReqSend = async (
  updated_data,
  resetForm,
  setProcessing,
  setToastText,
  setToastType,
  setToastOn,
  api_url
) => {
  try {
    const { data } = await axios.put(`/api/${api_url}`, updated_data);

    if (data?.success) {
      setProcessing(false);
      setToastType("success_toast");
      setToastOn(true);
      setToastText(data?.success);
      resetForm({ values: "" });
    } else {
      setProcessing(false);
      setToastType("error_toast");
      setToastOn(true);
      setToastText(data?.error);
      resetForm({ values: "" });
    }
  } catch (err) {
    setProcessing(false);
    setToastType("error_toast");
    setToastOn(true);
    setToastText(err.message);
    resetForm({ values: "" });
  }
};

// delete req sender here
export const deleteReqSend = async (
  setProcessing,
  setToastText,
  setToastType,
  setToastOn,
  api_url
) => {
  try {
    const { data } = await axios.delete(`/api/${api_url}`);

    if (data?.success) {
      setProcessing(false);
      setToastType("success_toast");
      setToastOn(true);
      setToastText(data?.success);
    } else {
      setProcessing(false);
      setToastType("error_toast");
      setToastOn(true);
      setToastText(data?.error);
    }
  } catch (err) {
    setProcessing(false);
    setToastType("error_toast");
    setToastOn(true);
    setToastText(err.message);
  }
};
