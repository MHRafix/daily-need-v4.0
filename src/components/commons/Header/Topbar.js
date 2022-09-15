import Cookie from "js-cookie";
import NextLink from "next/link";
import { BiLockAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

export default function Topbar() {
  // logged in user data here
  const user_loggedin =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  return (
    <div className="topbar_wrapper">
      <div className="container_wrapper">
        <div className="grid_layout layout_two !gap-5">
          <div className="annoucement_area">
            <h1 className="annoucement">
              20% cashback for all users | Code: OGOFERS13
            </h1>
          </div>
          <div className="account_area">
            <button
              className="btn-transparent"
              onClick={() => alert("Bangladesh")}
            >
              <span className="flex justify-between items-center">
                <GoLocation /> &nbsp; Your Location
              </span>
            </button>
            <NextLink
              href={
                // user_loggedin
                // ? "/my_account/my_profile/dashboard"
                "/my_account/my_acc"
              }
              passHref
            >
              <button className="btn-transparent">
                <span className="flex justify-between items-center">
                  <BiLockAlt /> &nbsp; Sign In
                </span>
              </button>
            </NextLink>
            <NextLink
              href={
                // user_loggedin
                // ? "/my_account/my_profile/dashboard"
                "/my_account/my_acc"
              }
              passHref
            >
              <button className="btn-transparent">
                <span className="flex justify-between items-center">
                  <FaUserCircle /> &nbsp; Sign Up
                </span>
              </button>
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
