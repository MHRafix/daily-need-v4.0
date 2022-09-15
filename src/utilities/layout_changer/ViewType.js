import Cookie from 'js-cookie';
import React from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { FaBars, FaList } from 'react-icons/fa';

export default function ViewType({ view_type }) {
	const { setGrid, grid, sidebaron, setsidebaron } = view_type;

	// handle grid layout
	const handleGridLayout = () => {
		Cookie.set('layout_changer', JSON.stringify(true));
		setGrid(true);
	};

	// handle list layout
	const handleListLayout = () => {
		Cookie.set('layout_changer', JSON.stringify(false));
		setGrid(false);
	};

	return (
		<div className='view_type'>
			<button
				className=' lg:!hidden'
				id={sidebaron ? 'layout_changer_btn_active' : 'layout_changer_btn'}
				onClick={() => setsidebaron(true)}
			>
				<FaBars />
			</button>
			&nbsp;&nbsp;&nbsp;
			<button
				id={grid ? 'layout_changer_btn_active' : 'layout_changer_btn'}
				onClick={handleGridLayout}
			>
				<BsFillGridFill />
			</button>
			&nbsp;&nbsp;&nbsp;
			<button
				id={!grid ? 'layout_changer_btn_active' : 'layout_changer_btn'}
				onClick={handleListLayout}
			>
				<FaList />
			</button>
		</div>
	);
}
