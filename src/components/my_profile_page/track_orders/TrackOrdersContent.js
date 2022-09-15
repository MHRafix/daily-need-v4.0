import React, { useState } from 'react';
import useUpdateReq from '../../../hooks/http_req/updateReq';
import Table from '../../../lib/Tables/table/Table';
import { UserActiveOrdersTableConfig } from '../../../lib/Tables/table_config/TableColumns';
import AlertToast from '../../../utilities/alertToast/AlertToast';
import ReactModal from '../../../utilities/Modal/ReactModal';
import ProfileContentLayout from '../../../utilities/ProfileContentLayout';
import StripePaymentForm from '../../../utilities/StripePayment/StripePaymentForm';
import toastConfig from '../../../utilities/toastConfig';

export default function TrackOrdersContent({ active_orders }) {
	const [modal, setModal] = useState(false);
	const [total, setTotal] = useState();
	const [id, setId] = useState();

	// handle cancel order
	const { toastOn, setToastOn, toastType, toastText, handleUpdate } =
		useUpdateReq();

	// handle payment modal
	const handleModal = (oid, total) => {
		setModal(true);
		setTotal(total);
		setId(oid);
	};

	// handle user active order table data
	const { UserActiveOrdersTableColumns } = UserActiveOrdersTableConfig(
		handleUpdate,
		handleModal
	);

	// toast config
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	return (
		<>
			<ProfileContentLayout content_title='Track Orders'>
				{/* alert toast */}
				{toastOn && <AlertToast toast_config={toast_config} />}

				<Table
					table_columns={UserActiveOrdersTableColumns}
					table_data={active_orders}
					sorter={false}
				/>

				{modal && (
					<ReactModal setModal={setModal} modal_title='Pay Now'>
						<StripePaymentForm amount={total} order_id={id} />
					</ReactModal>
				)}
			</ProfileContentLayout>
		</>
	);
}
