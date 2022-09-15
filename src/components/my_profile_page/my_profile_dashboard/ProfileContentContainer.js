import Cookie from "js-cookie";
import ProfileNavigation from "./ProfileNavigation";

export default function ProfileContentContainer({ children }) {
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  return (
    <div className="md:flex shadow-lg border border-slate-300 md:h-auto">
      <div className="my_profile_navigation">
        <ProfileNavigation />
      </div>
      <div className="my_profile_content_body">{children}</div>
    </div>
  );
}
