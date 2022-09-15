import React from 'react';

export default function DashboardContentLayout({
	item_name,
	btn_content,
	btn_id,
	handleAddItem,
	children,
}) {
	return (
		<>
			<div id='chart_layout_wrapper' className='bg-white py-1.5 rounded-md'>
				<div
					id='chart_title_wrapper'
					className='flex items-center justify-between'
				>
					<div>
						<h1 id='chart_title'>{item_name}</h1>
					</div>
					{btn_content && (
						<div id={btn_id} onClick={handleAddItem} className='cursor-pointer'>
							<button>{btn_content}</button>
						</div>
					)}
				</div>
				<div id='chart_area_wrapper'>{children}</div>
			</div>
		</>
	);
}
