import Cookie from 'js-cookie';
import Image from 'next/image';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Table from '../../lib/Tables/table/Table';
import { UserProductTableConfig } from '../../lib/Tables/table_config/TableColumns';

export default function InvoiceHistory({ modal_data }) {
	const userInfo =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	const componentRef = useRef();

	// table columns and config
	const { UserProductTableColumns } = UserProductTableConfig();

	return (
		<div className='invoice_wrapper'>
			<ReactToPrint
				trigger={() => (
					<div className='download_btns'>
						<button id='cart_btn' className='!text-normal'>
							Print Invoice
						</button>
					</div>
				)}
				content={() => componentRef.current}
			/>

			<div
				ref={componentRef}
				className='invoice_document_area'
				style={{ margin: '20px' }}
			>
				<div className='customer_document flex justify-between'>
					<div className='my-7'>
						{userInfo?.user_pic && (
							<Image
								src={userInfo?.user_pic}
								alt='profile pic'
								width={150}
								height={150}
								className='rounded-full'
							/>
						)}
						<div className='my-4 tracking-wider text-medium font-bold'>
							Name : &nbsp;&nbsp; {userInfo?.user_name}
						</div>
					</div>
					<div className='customers_info mb-5 text-left text-black2 text-normal'>
						<div className='my-4 tracking-wider'>
							Email : &nbsp;&nbsp; {userInfo?.user_email}
						</div>
						<div className='my-4 tracking-wider'>
							Mobile : &nbsp;&nbsp;
							{modal_data?.customer_info?.customer_mobile}
						</div>
						<div className='my-4 tracking-wider'>
							Total Itmes : &nbsp;&nbsp; {modal_data?.products_data.length}
						</div>
						<div className='my-4 tracking-wider'>
							Net Bill : &nbsp;&nbsp; ৳
							{modal_data?.order_overview?.total_amount}
						</div>
						<div className='my-4 tracking-wider'>
							Order Date : &nbsp;&nbsp; {modal_data?.createdAt}
						</div>
						<div className='my-4 tracking-wider'>
							Payment Type : &nbsp;&nbsp;
							{modal_data?.payment_info?.payment_method}
						</div>
						<div className='my-4 tracking-wider'>
							Payment Date : &nbsp;&nbsp; {modal_data?.updatedAt}
						</div>
					</div>
				</div>
				<div className='ordered_products_table' style={{ marginTop: '30px' }}>
					<Table
						table_columns={UserProductTableColumns}
						table_data={modal_data?.products_data}
						sorter={false}
					/>
				</div>
			</div>
		</div>
	);
}
