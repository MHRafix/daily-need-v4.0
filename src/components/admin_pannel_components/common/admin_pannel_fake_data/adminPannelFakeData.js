import { BiDuplicate, BiHomeAlt, BiSlider } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdBorderAll, MdSecurity } from "react-icons/md";

export const admin_pannel_navigation = [
  {
    _id: 1,
    main_nav: "Dashboard",
    main_nav_icon: <BiHomeAlt />,
    main_nav_link: "/admin_dashboard",
  },
  {
    _id: 451,
    main_nav: "Manage Category",
    main_nav_icon: <BiDuplicate />,
    main_nav_link: "/manage_category_products",
  },
  {
    _id: 2,
    main_nav: "Manage Products",
    main_nav_icon: <MdBorderAll />,
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all products",
        sub_nav_link: "/manage_products/all_products",
      },
      {
        _id: 2,
        sub_nav_name: "limited products",
        sub_nav_link: "/manage_products/limited_offers_products",
      },
      {
        _id: 3,
        sub_nav_name: "manage stock",
        sub_nav_link: "/manage_products/inventory_management",
      },
    ],
  },
  {
    _id: 3,
    main_nav: "Manage Orders",
    main_nav_icon: <BsCartCheck />,
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all orders",
        sub_nav_link: "/manage_orders/all_orders",
      },
    ],
  },
  {
    _id: 4,
    main_nav: "Authentication",
    main_nav_icon: <MdSecurity />,
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "admin login",
        sub_nav_link: "admin_login",
      },

      {
        _id: 3,
        sub_nav_name: "forgot password",
        sub_nav_link: "forgot_password",
      },
    ],
  },

  {
    _id: 5,
    main_nav: "My Profile",
    main_nav_icon: <CgProfile />,
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "profile dashboard",
        sub_nav_link: "/my_profile/my_profile_dashboard",
      },
      {
        _id: 2,
        sub_nav_name: "edit profile details",
        sub_nav_link: "/my_profile/edit_profile_details",
      },
    ],
  },

  {
    _id: 6,
    main_nav: "Mail Box",
    main_nav_icon: <HiOutlineMail />,
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all mails",
        sub_nav_link: "/mail_box/all_mails",
      },
      {
        _id: 2,
        sub_nav_name: "mail inbox",
        sub_nav_link: "/mail_box/mail_inbox",
      },
      {
        _id: 3,
        sub_nav_name: "compose mail",
        sub_nav_link: "/mail_box/sent_mail",
      },
      {
        _id: 4,
        sub_nav_name: "sent mail",
        sub_nav_link: "/mail_box/compose_mail",
      },
    ],
  },
  {
    _id: 7,
    main_nav: "Manage Users",
    main_nav_icon: <FiUsers />,
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all users",
        sub_nav_link: "/manage_users/all_users",
      },
      {
        _id: 2,
        sub_nav_name: "create admin",
        sub_nav_link: "/manage_users/create_admin",
      },
    ],
  },
  {
    _id: 8,
    main_nav: "Manage Sliders",
    main_nav_icon: <BiSlider />,
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all sliders",
        sub_nav_link: "/manage_sliders/all_sliders",
      },
      {
        _id: 2,
        sub_nav_name: "add slider",
        sub_nav_link: "/manage_sliders/add_slider",
      },
    ],
  },
  {
    _id: 9,
    main_nav: "notification list",
    main_nav_link: "/notification_list",
    main_nav_icon: <IoMdNotificationsOutline />,
  },
];
