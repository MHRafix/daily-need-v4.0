import { motion } from 'framer-motion';
import NextLink from 'next/link';
import React from 'react';
import { MdLogout } from 'react-icons/md';
import { useSelector } from 'react-redux';
import useAnimation from '../../../hooks/animation/useAnimation';
import { useHandleLogout } from '../../../hooks/othersHooks/useHandleLogout';

export default function ToggleProfileMenu({ toggle_menu }) {
	const { menus, dep } = toggle_menu;
	const { fadePop } = useAnimation();
	const { handleLogout } = useHandleLogout();
	return (
		<motion.div
			className='absolute z-50'
			initial='offscreen'
			whileInView='onscreen'
			exit={fadePop.exit}
			variants={fadePop}
		>
			<div id={dep ? 'profile_action_menus' : 'action_plate_three_admin'}>
				{menus.map((menu, i) => (
					<MenuBtn key={i} nav_data={menu} dep={dep} />
				))}
				<button
					id='action_btn_icon'
					onClick={handleLogout}
					className='text-black2'
				>
					<MdLogout id='profile_nav_btn_red_btn' />
					&nbsp;Sign Out
				</button>
			</div>
		</motion.div>
	);
}

export const MenuBtn = ({ nav_data, dep }) => {
	const { menu_name, MenuIcon, menu_href } = nav_data;
	const userInfo = useSelector((state) => state.users.loggedin_user);
	return (
		<NextLink
			href={
				dep
					? `/my_account/${userInfo?.user_email}/my_profile${menu_href}`
					: `/admin_pannel/${userInfo?.user_email}/my_profile${menu_href}`
			}
			passHref
		>
			<button id='action_btn_icon' className='text-black2'>
				{MenuIcon}
				&nbsp;{menu_name}
			</button>
		</NextLink>
	);
};
