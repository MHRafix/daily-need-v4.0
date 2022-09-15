import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ToggleProfileMenu from './ToggleProfileMenu';

export default function AccountLinks({ toggle_menu }) {
	const [toggle, setToggle] = useState(false);
	const isLoggedin = useSelector((state) => state.users.loggedin_user);

	return (
		<>
			{isLoggedin?.user_email ? (
				<div id='profile_navigation_action_wrapper'>
					<div
						className='header_action_profile_icon'
						onClick={() => setToggle((state) => (state ? false : true))}
					>
						<Image
							src={isLoggedin?.user_pic}
							alt='user pic'
							width={35}
							height={35}
							className='rounded-full'
						/>
					</div>
					<AnimatePresence>
						{toggle && <ToggleProfileMenu toggle_menu={toggle_menu} />}
					</AnimatePresence>
				</div>
			) : (
				<NextLink href='/my_account/my_acc' passHref>
					<div className='header_action_icon'>
						<span className='cart_badge !mr-0'>
							<FaUserCircle />
						</span>
						&nbsp; <span className='xs:hidden lg:!block'>My Account</span>
					</div>
				</NextLink>
			)}
		</>
	);
}
