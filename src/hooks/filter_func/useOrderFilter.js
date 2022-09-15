import { useState } from 'react';

export default function useOrderFilter(data, setFilterData) {
	const [active, setActive] = useState('reset');

	// handle search filtering
	const handleSearchFilter = (e) => {
		const search_res = data.filter((order) =>
			order.customer_info.customer_name
				.toLowerCase()
				.includes(e.target.value.toLowerCase())
		);
		setFilterData(search_res);
	};

	// handle status filter function here
	const handleStatusFilter = (status, activer) => {
		const filtered_orders = data?.filter(
			(order) => order.order_overview.order_status === status
		);
		setActive(activer);
		setFilterData(filtered_orders);
	};

	// reset filter
	const handleResetFilter = (activer) => {
		setActive(activer);
		setFilterData(data);
	};

	// sorting dependency
	const order_sorting_dependency = {
		handleSearchFilter,
		handleStatusFilter,
		handleResetFilter,
		active,
	};

	return {
		// show,
		order_sorting_dependency,
		// handleAddFormShow,
	};
}
