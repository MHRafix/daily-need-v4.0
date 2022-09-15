import React from 'react';
import AdminPannelBreadcrumb from '../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb';
import AllOrdersContent from './AllOrdersContent';

export default function AllOrdersMain({ all_orders }) {
	const bread_nav = 'manage orders / all orders';
	return (
		<>
			<AdminPannelBreadcrumb
				page_name='manage all orders'
				breadcrumb_name={bread_nav}
			/>
			<AllOrdersContent all_orders={all_orders} />
		</>
	);
}
