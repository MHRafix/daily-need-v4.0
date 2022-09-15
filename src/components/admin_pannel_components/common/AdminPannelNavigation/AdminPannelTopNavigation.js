import React, { useState } from 'react';
import { FiMessageSquare, FiSearch } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineDarkMode, MdOutlineLanguage } from 'react-icons/md';
import { RiBarChartHorizontalLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toggle_admin_profile_navigation } from '../../../../fake_data/all_fakedata';
import AccountLinks from '../../../commons/Header/AccountLinks';

export default function AdminPannelTopNavigation({
	setNavigationOn,
	navigationOn,
}) {
	const [notification, setNotification] = useState(0);
	const [messages, setMessages] = useState(1);
	const userInfo = useSelector((state) => state.users.loggedin_user);

	return (
		<>
			<div className='admin_pannel_top_navigation_wrapper'>
				<div className='left_side_search_area'>
					<div className='w-1/12 text-medium flex items-center'>
						<button
							className='cursor-pointer'
							onClick={() => {
								if (navigationOn) {
									setNavigationOn(false);
								} else {
									setNavigationOn(true);
								}
							}}
						>
							<RiBarChartHorizontalLine />
						</button>
					</div>
					<div className='w-10/12 md:!block xs:hidden relative'>
						<input
							type='text'
							placeholder='Search for result...'
							id='admin_pannel_search_input'
						/>
						<button className='absolute right-4 top-5 text-slate-400 text-normal'>
							<FiSearch />
						</button>
					</div>
				</div>
				<div className='right_side_action_icon'>
					<div className='admin_pannel_header_action_icon'>
						<MdOutlineLanguage /> &nbsp;
						<div className='text-light text-wider'>English</div>
					</div>
					<div className='admin_pannel_header_action_icon'>
						<MdOutlineDarkMode />
						{/* <MdLightMode /> */}
					</div>
					<div className='admin_pannel_header_action_icon'>
						<IoMdNotificationsOutline />
						<div
							className={
								notification
									? 'notification_counter green'
									: 'notification_counter red'
							}
						>
							0
						</div>
					</div>
					<div className='admin_pannel_header_action_icon'>
						<FiMessageSquare />
						<div
							className={
								messages
									? 'notification_counter green !bottom-8'
									: 'notification_counter purple !bottom-8'
							}
						>
							0
						</div>
					</div>
					<div className='admin_pannel_header_action_icon'>
						<AccountLinks
							toggle_menu={{
								menus: toggle_admin_profile_navigation,
								dep: false,
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
