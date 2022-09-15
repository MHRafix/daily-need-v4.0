import React, { useState } from 'react';
import useModalFilter from '../../../hooks/filter_func/useModalFilter';
import useOrderFilter from '../../../hooks/filter_func/useOrderFilter';
import Table from '../../../lib/Tables/table/Table';
import {
	UserOrderedTableConfig,
	UserProductTableConfig,
} from '../../../lib/Tables/table_config/TableColumns';
import ReactModal from '../../../utilities/Modal/ReactModal';
import ProfileContentLayout from '../../../utilities/ProfileContentLayout';

export default function MyAllOrdersContent({ my_orders }) {
	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [orderData, setOrderData] = useState(my_orders);

	// handle  modal data
	const handleModal = (products_data) => {
		setModalData(products_data);
		setFilterData(products_data);
		setModal(true);
	};

	// initialize filter and sorting dependency
	const { sorting_dependency } = useModalFilter(modalData, setFilterData);
	const { order_sorting_dependency } = useOrderFilter(my_orders, setOrderData);

	// table columns and config
	const { UserOrderedTableColumns } = UserOrderedTableConfig(handleModal);
	const { UserProductTableColumns } = UserProductTableConfig();

	return (
		<>
			<ProfileContentLayout content_title='manage all orders'>
				{/* orders show on table */}
				<div className='dashboard_row_wrapper'>
					<Table
						table_columns={UserOrderedTableColumns}
						table_data={orderData}
						sorting_dependency={order_sorting_dependency}
						sorter={true}
						isProduct={false}
						handleModal={handleModal}
					/>

					{modal && (
						<ReactModal
							setModal={setModal}
							modal_data={modalData}
							modal_title='Order Details'
						>
							<Table
								table_columns={UserProductTableColumns}
								table_data={filterData}
								sorting_dependency={sorting_dependency}
								sorter={true}
								isProduct={true}
							/>
						</ReactModal>
					)}
				</div>
			</ProfileContentLayout>
		</>
	);
}
