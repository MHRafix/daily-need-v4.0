import React, { useState } from 'react';
import Table from '../../../lib/Tables/table/Table';
import { ShppedOrderedTableConfig } from '../../../lib/Tables/table_config/TableColumns';
import InvoiceHistory from '../../../utilities/invoice/InvoiceHistory';
import ReactModal from '../../../utilities/Modal/ReactModal';
import ProfileContentLayout from '../../../utilities/ProfileContentLayout';

export default function HistoryDownloadContent({ my_orders }) {
	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState([]);
	const [orderData, setOrderData] = useState(my_orders);

	// handle modal and modal data
	const handleModal = (id) => {
		const modal_data = my_orders.find((order) => order._id === id);
		setModalData(modal_data);
		setModal(true);
	};

	// table columns and config
	const { ShippedOrderedTableColumns } = ShppedOrderedTableConfig(handleModal);

	return (
		<>
			<ProfileContentLayout content_title='history download'>
				{/* shipped orders show on table */}
				<div className='dashboard_row_wrapper'>
					<Table
						table_columns={ShippedOrderedTableColumns}
						table_data={orderData}
						sorter={false}
						handleModal={handleModal}
					/>
					{modal && (
						<ReactModal setModal={setModal} modal_title='History Invoice'>
							<InvoiceHistory modal_data={modalData} />
						</ReactModal>
					)}
				</div>
			</ProfileContentLayout>
		</>
	);
}
