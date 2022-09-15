import React, { useState } from 'react';
import useModalFilter from '../../../../../hooks/filter_func/useModalFilter';
import useOrderFilter from '../../../../../hooks/filter_func/useOrderFilter';
import useDeleteReq from '../../../../../hooks/http_req/deleteReq';
import Table from '../../../../../lib/Tables/table/Table';
import {
	OrderedTableConfig,
	ProductTableConfig,
} from '../../../../../lib/Tables/table_config/TableColumns';
import AlertToast from '../../../../../utilities/alertToast/AlertToast';
import ReactModal from '../../../../../utilities/Modal/ReactModal';
import toastConfig from '../../../../../utilities/toastConfig';
import DashboardContentLayout from '../../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout';

export default function AllOrdersContent({ all_orders }) {
	const [modalData, setModalData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [orderData, setOrderData] = useState(all_orders);
	const [modal, setModal] = useState(false);

	// handle  modal data
	const handleModal = (products_data) => {
		setModalData(products_data);
		setFilterData(products_data);
		setModal(true);
	};

	// initialize filter and sorting dependency
	const { sorting_dependency } = useModalFilter(modalData, setFilterData);
	const { order_sorting_dependency } = useOrderFilter(all_orders, setOrderData);

	// delete hook
	const { toastOn, setToastOn, toastType, toastText, handleDelete } =
		useDeleteReq();

	// toast config
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	// table columns and config
	const { OrderedTableColumns } = OrderedTableConfig(handleDelete, handleModal);
	const { ProductTableColumns } = ProductTableConfig(handleDelete);

	return (
		<>
			{/* alert toast here */}
			{toastOn && <AlertToast toast_config={toast_config} />}

			{/* orders show on table */}
			<div className='dashboard_row_wrapper'>
				<DashboardContentLayout item_name='all orders'>
					<Table
						table_columns={OrderedTableColumns}
						table_data={orderData}
						sorting_dependency={order_sorting_dependency}
						sorter={true}
						isProduct={false}
						handleModal={handleModal}
					/>
				</DashboardContentLayout>
				{modal && (
					<ReactModal
						setModal={setModal}
						modal_data={modalData}
						modal_title='Ordered Products'
					>
						<Table
							table_columns={ProductTableColumns}
							table_data={filterData}
							sorting_dependency={sorting_dependency}
							sorter={true}
							isProduct={true}
						/>
					</ReactModal>
				)}
			</div>
		</>
	);
}
