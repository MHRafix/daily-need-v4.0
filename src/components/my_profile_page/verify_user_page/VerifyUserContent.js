import React from "react";
import ProfileContentLayout from "../../../utilities/ProfileContentLayout";
import VerifyUserForm from "./VerifyUserDetails/VerfiyUserForm";

export default function VerifyUserContent() {
  return (
    <>
      <ProfileContentLayout content_title="user verification">
        <VerifyUserForm />
      </ProfileContentLayout>
    </>
  );
}
