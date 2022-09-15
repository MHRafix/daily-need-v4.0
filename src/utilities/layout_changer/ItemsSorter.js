import React from 'react';

export default function ItemsSorter({ item, setItems }) {
	return (
		<div id='sorter_input_wrapper'>
			{/* Show */}
			<select
				value={item}
				id='product_sorting'
				onChange={(e) => setItems(Number(e.target.value))}
			>
				{[3, 6, 9, 12, 15, 18].map((items, i) => (
					<option key={i} value={items}>
						{items}
					</option>
				))}
			</select>
			{/* entries */}
		</div>
	);
}
