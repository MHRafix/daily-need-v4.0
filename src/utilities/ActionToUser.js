import { AnimatePresence, motion } from 'framer-motion';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
	MdCancel,
	MdOutlinePayments,
	MdOutlineShareLocation,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import useAnimation from '../hooks/animation/useAnimation';

export default function ActionToUser({
	api_url,
	id,
	status,
	handleCancel,
	handleModal,
	net_total,
}) {
	const userInfo = useSelector((state) => state.users.loggedin_user);
	// action plate toggle state
	const [visible, setVisible] = useState(false);
	// animation hook
	const { fadePop } = useAnimation();

	return (
		<div>
			<div className='action_three-dots'>
				<button
					id='action_btn'
					onClick={() => setVisible((state) => (state ? false : true))}
				>
					<BsThreeDotsVertical size={20} />
				</button>
			</div>
			<AnimatePresence>
				{visible && (
					<motion.div
						className='absolute z-50'
						initial='offscreen'
						whileInView='onscreen'
						exit={fadePop.exit}
						variants={fadePop}
					>
						<div
							id={status === 'due' ? 'action_plate_three' : 'action_plate_two'}
						>
							{status === 'due' && (
								<button
									id='action_btn_icon'
									onClick={() => handleModal(id, net_total)}
								>
									<MdOutlinePayments
										size={20}
										className='text-light_purple cursor-pointer text-normal outline-none'
									/>
									&nbsp;Payment
								</button>
							)}
							<button
								id='action_btn_icon'
								onClick={() => {
									handleCancel(api_url);
									setVisible((state) => state && false);
								}}
							>
								<MdCancel className='text-red-500 cursor-pointer text-normal outline-none' />
								&nbsp;Cancel
							</button>
							<NextLink
								href={`/my_account/${userInfo.user_email}/my_profile/track_order_result/${id}`}
								passHref
							>
								<button id='action_btn_icon'>
									<MdOutlineShareLocation
										size={20}
										className='text-green cursor-pointer text-normal outline-none'
									/>
									&nbsp; Track
								</button>
							</NextLink>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
