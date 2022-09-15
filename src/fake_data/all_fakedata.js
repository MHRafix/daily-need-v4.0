// category image import here
import { BsClockHistory } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import {
	MdManageSearch,
	MdOutlineDashboard,
	MdOutlineShareLocation,
} from 'react-icons/md';
import { RiProfileLine } from 'react-icons/ri';

// header navigation menus fake data here
export const header_navigation = [
	{ _id: 1, menu_name: 'home', href: '/' },
	{ _id: 2, menu_name: 'about us', href: '/about_us' },
	{
		_id: 3,
		menu_name: 'fruits & vegetables',
		href: '/categories/fruits_and_vegetables',
	},
	{ _id: 4, menu_name: 'shop', href: '/shop/grid_shop' },
	{ _id: 5, menu_name: 'blog', href: '/blog' },
	{ _id: 6, menu_name: 'FAQ', href: '/faq' },
	{ _id: 7, menu_name: 'contact', href: '/contact' },
];

// header navigation menus fake data here
export const profile_navigation = [
	{
		_id: 1,
		menu_name: 'dashboard',
		href: '/dashboard',
		menu_icon: <MdOutlineDashboard />,
	},
	{
		_id: 2,
		menu_name: 'my all orders',
		href: '/my_all_orders',
		menu_icon: <MdManageSearch />,
	},
	{
		_id: 3,
		menu_name: 'history download',
		href: '/history_download',
		menu_icon: <BsClockHistory />,
	},
	{
		_id: 4,
		menu_name: 'edit details',
		href: '/verify_user',
		menu_icon: <FiEdit />,
	},
	{
		_id: 5,
		menu_name: 'track orders',
		href: '/track_orders',
		menu_icon: <MdOutlineShareLocation />,
	},
];

// toggle profile nav data
export const toggle_profile_navigation = [
	{
		menu_name: 'dashboard',
		menu_href: '/dashboard',
		MenuIcon: <MdOutlineDashboard id='profile_nav_btn_purple_btn' />,
	},
	{
		menu_name: 'my orders',
		menu_href: '/my_all_orders',
		MenuIcon: <MdManageSearch id='profile_nav_btn_yellow_btn' />,
	},
	{
		menu_name: 'track orders',
		menu_href: '/track_orders',
		MenuIcon: <MdOutlineShareLocation id='profile_nav_btn_green_btn' />,
	},
];

// toggle profile nav data
export const toggle_admin_profile_navigation = [
	{
		menu_name: 'dashboard',
		menu_href: '/my_profile_dashboard',
		MenuIcon: <RiProfileLine id='profile_nav_btn_purple_btn' />,
	},
	{
		menu_name: 'Edit Profile',
		menu_href: '/edit_profile_details',
		MenuIcon: <FaUserEdit id='profile_nav_btn_yellow_btn' />,
	},
];

// stock data here
export const stock_data = [
	{ _id: 1, filter_name: 'in-stock' },
	{ _id: 2, filter_name: 'stock-out' },
];

// type data here
export const type_data = [
	{ _id: 2, filter_name: 'on-sale' },
	{ _id: 3, filter_name: 'fixed-sale' },
	{ _id: 4, filter_name: 'offer-sale' },
];

export const month_name = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];
