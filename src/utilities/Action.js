import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import useAnimation from '../hooks/animation/useAnimation';

export default function Action({
	api_url,
	handleDelete,
	handleModal,
	keyProperties,
}) {
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
						<div id={keyProperties ? 'action_plate_three' : 'action_plate_two'}>
							<button
								id='action_btn_icon'
								onClick={() => setVisible((state) => state && false)}
							>
								<FiEdit className='text-light_purple cursor-pointer text-normal outline-none' />
								&nbsp;Update
							</button>
							<button
								id='action_btn_icon'
								onClick={() => {
									handleDelete(api_url);
									setVisible((state) => state && false);
								}}
							>
								<RiDeleteBinLine className='text-red-500 cursor-pointer text-normal outline-none' />
								&nbsp;Delete
							</button>
							{keyProperties && (
								<button
									id='action_btn_icon'
									onClick={() => {
										handleModal(keyProperties);
										setVisible((state) => state && false);
									}}
								>
									<MdOutlinePlaylistAdd className='text-green cursor-pointer text-normal outline-none' />
									&nbsp;Details
								</button>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
