import Image from 'next/image';
import { BiUserCircle } from 'react-icons/bi';
import { FiLoader } from 'react-icons/fi';
import {
	MdOfflinePin,
	MdOutlineAdminPanelSettings,
	MdOutlineCancel,
	MdOutlineMoneyOff,
	MdOutlinePaid,
	MdOutlinePlaylistAdd,
} from 'react-icons/md';
import { RiUserSettingsLine } from 'react-icons/ri';
import { VscServerProcess } from 'react-icons/vsc';
import { month_name } from '../../../fake_data/all_fakedata';
import Action from '../../../utilities/Action';
import ActionToUser from '../../../utilities/ActionToUSer';

// table row sorter here
const userSort = (rowA, rowB) => {
	const a = rowA.user_name.toLowerCase();
	const b = rowB.user_name.toLowerCase();

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};

// product sort
const productSort = (rowA, rowB) => {
	const a = rowA.title.toLowerCase();
	const b = rowB.title.toLowerCase();

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};

// product sort
const orderSort = (rowA, rowB) => {
	const a = rowA.order_overview.order_status.toLowerCase();
	const b = rowB.order_overview.order_status.toLowerCase();

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};

// product sort
const catSort = (rowA, rowB) => {
	const a = rowA.cat_name.toLowerCase();
	const b = rowB.cat_name.toLowerCase();

	if (a > b) {
		return 1;
	}

	if (b > a) {
		return -1;
	}

	return 0;
};

// user table config and columns here
export const UserTableConfig = (handleDelete) => {
	const userRole = (cell) => {
		if (cell === 'customer') {
			return (
				<div id='warning_signal_status'>
					<BiUserCircle size={16} /> Customer
				</div>
			);
		} else if (cell === 'admin') {
			return (
				<div id='green_signal_status'>
					<MdOutlineAdminPanelSettings size={16} /> Admin
				</div>
			);
		} else if (cell === 'moderator') {
			return (
				<div id='info_signal_status'>
					<RiUserSettingsLine size={16} /> Moderator
				</div>
			);
		}
	};

	const UserTableColumns = [
		{
			name: 'User Name',
			selector: (row) => (
				<div className='capitalize block'>{row.user_name}</div>
			),
			sortable: true,
			sortFunction: userSort,
		},

		{
			name: 'Profile Pic',
			selector: (row) => (
				<div style={{ padding: '5px' }}>
					<Image
						src={row.user_pic}
						alt='user pic'
						width={40}
						height={40}
						className='rounded-full'
					/>
				</div>
			),
		},
		{
			name: 'User Email',
			selector: (row) => row.user_email,
			sortable: true,
			sortFunction: userSort,
		},
		{
			name: 'User Role',
			selector: (row) => userRole(row.user_role),
		},

		{
			name: 'Action',
			selector: (row) => (
				<Action
					isShow={false}
					api_url={`admin_pannel_api/manage_users/delete_user/${row._id}`}
					handleDelete={handleDelete}
				/>
			),
		},
	];

	return { UserTableColumns };
};

// products table config and columns here
export const ProductTableConfig = (handleDelete) => {
	const ProductTableColumns = [
		{
			name: 'Title',
			selector: (row) => <div className='capitalize'>{row.title}</div>,
			sortable: true,
			sortFunction: productSort,
		},

		{
			name: 'Image',
			selector: (row) => (
				<div style={{ padding: '5px' }}>
					{row.thumbnail.src ? (
						<Image
							src={row.thumbnail}
							alt='product pic'
							className='rounded-full'
						/>
					) : (
						<Image
							src={row.thumbnail}
							alt='product pic'
							width={50}
							height={50}
							className='rounded-full'
						/>
					)}
				</div>
			),
		},
		{
			name: 'Category',
			selector: (row) => row.category,
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Reg Price',
			selector: (row) => <div>৳ {row.prices.regular_price}</div>,
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Sale Price',
			selector: (row) => <div>৳ {row.prices.sale_price}</div>,
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Available',
			selector: (row) =>
				row.stock_available > 0 ? (
					<div id='green_signal_status'>{row.stock_available} kg</div>
				) : (
					<div id='green_signal_status'>✖</div>
				),
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Status',
			selector: (row) =>
				row.product_status === 'in-stock' ? (
					<div id='green_signal_status'>{row.product_status}</div>
				) : (
					<div id='red_signal_status'>{row.product_status}</div>
				),
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Type',
			selector: (row) =>
				row.product_type === 'on-sale' ? (
					<div id='info_signal_status'>{row.product_type}</div>
				) : (
					<div id='warning_signal_status'>{row.product_type}</div>
				),
			sortable: true,
			sortFunction: productSort,
		},

		{
			name: 'Action',
			selector: (row) => (
				<Action
					isShow={false}
					api_url={`admin_pannel_api/manage_products/delete_product/${row._id}`}
					handleDelete={handleDelete}
				/>
			),
		},
	];

	return { ProductTableColumns };
};

// category table config and columns here
export const CategoryTableConfig = (
	handleDelete,
	all_products,
	handleModal
) => {
	// handle quantity of category products
	const handleCategoryQty = (category) => {
		const category_products = all_products?.filter(
			(product) => product.category === category
		);
		return <div>{category_products.length}</div>;
	};

	const CategoryTableColumns = [
		{
			name: 'Category Name',
			selector: (row) => <div className='!capitalize'>{row.cat_name}</div>,
			sortable: true,
			sortFunction: catSort,
		},

		{
			name: 'Category Image',
			selector: (row) => (
				<div style={{ padding: '5px' }}>
					<Image
						src={row.cat_image}
						alt='product pic'
						width={50}
						height={50}
						className='rounded-full'
					/>
				</div>
			),
		},
		{
			name: 'Products Quantity',
			selector: (row) => handleCategoryQty(row.cat_name),
		},

		{
			name: 'Action',
			selector: (row) => (
				<Action
					// isShow={true}
					api_url={`admin_pannel_api/manage_products/delete_product/${row._id}`}
					handleDelete={handleDelete}
					handleModal={handleModal}
					keyProperties={row.cat_name}
				/>
			),
		},
	];

	return { CategoryTableColumns };
};

// ordered products table config and columns here
export const OrderedTableConfig = (handleDelete, handleModal) => {
	const orderStatus = (cell) => {
		if (cell === 'canceled') {
			return (
				<div id='red_signal_status'>
					<MdOutlineCancel size={16} /> cancel
				</div>
			);
		} else if (cell === 'shipped') {
			return (
				<div id='green_signal_status'>
					<MdOfflinePin size={16} /> shiped
				</div>
			);
		} else if (cell === 'pendding') {
			return (
				<div id='warning_signal_status'>
					<FiLoader size={16} /> pending
				</div>
			);
		} else if (cell === 'inprogress') {
			return (
				<div id='info_signal_status'>
					<VscServerProcess size={16} /> process
				</div>
			);
		}
	};

	const OrderedTableColumns = [
		{
			name: 'CM Name',
			selector: (row) => (
				<div className='!capitalize'>{row.customer_info.customer_name}</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'CM Mobile',
			selector: (row) => (
				<div className='!capitalize'>{row.customer_info.customer_mobile}</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Order Date',
			selector: (row) => (
				<div>
					{row.order_overview.order_date.date}{' '}
					{month_name[row.order_overview.order_date.month]}{' '}
					{row.order_overview.order_date.year}
				</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Total Amount',
			selector: (row) => (
				<div className='!capitalize font-semibold'>
					৳ {row.order_overview.total_amount}
				</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Payment Status',
			selector: (row) =>
				row.payment_info.payment_status === 'due' ? (
					<div id='red_signal_status'>
						<MdOutlineMoneyOff size='16' /> {row.payment_info.payment_status}
					</div>
				) : (
					<div id='green_signal_status'>
						<MdOutlinePaid size='16' /> {row.payment_info.payment_status}
					</div>
				),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Status',
			selector: (row) => orderStatus(row.order_overview.order_status),
			sortable: true,
			sortFunction: orderSort,
		},

		{
			name: 'Action',
			selector: (row) => (
				<Action
					api_url={`admin_pannel_api/manage_products/delete_product/${row._id}`}
					handleDelete={handleDelete}
					handleModal={handleModal}
					keyProperties={row.products_data}
				/>
			),
		},
	];

	return { OrderedTableColumns };
};

// shipped ordered products table config and columns here
export const ShppedOrderedTableConfig = (handleModal) => {
	const ShippedOrderedTableColumns = [
		{
			name: 'CM Name',
			selector: (row) => (
				<div className='!capitalize'>{row.customer_info.customer_name}</div>
			),
		},
		{
			name: 'CM Mobile',
			selector: (row) => (
				<div className='!capitalize'>{row.customer_info.customer_mobile}</div>
			),
		},
		{
			name: 'Order Date',
			selector: (row) => (
				<div>
					{row.order_overview.order_date.date}{' '}
					{month_name[row.order_overview.order_date.month]}{' '}
					{row.order_overview.order_date.year}
				</div>
			),
		},
		{
			name: 'Total Amount',
			selector: (row) => (
				<div className='!capitalize font-semibold'>
					৳ {row.order_overview.total_amount}
				</div>
			),
		},
		{
			name: 'Payment Status',
			selector: (row) =>
				row.payment_info.payment_status === 'due' ? (
					<div id='red_signal_status'>
						<MdOutlineMoneyOff size='16' /> {row.payment_info.payment_status}
					</div>
				) : (
					<div id='green_signal_status'>
						<MdOutlinePaid size='16' /> {row.payment_info.payment_status}
					</div>
				),
		},
		{
			name: 'Status',
			selector: (row) => (
				<div id='green_signal_status'>
					<MdOfflinePin size={16} /> shiped
				</div>
			),
		},

		{
			name: 'Action',
			selector: (row) => (
				<button onClick={() => handleModal(row._id)} id='cart_btn'>
					Invoice
				</button>
			),
		},
	];

	return { ShippedOrderedTableColumns };
};

// user products table config and columns here
export const UserProductTableConfig = () => {
	const UserProductTableColumns = [
		{
			name: 'Title',
			selector: (row) => <div className='capitalize'>{row.title}</div>,
			sortable: true,
			sortFunction: productSort,
		},

		{
			name: 'Image',
			selector: (row) => (
				<div style={{ padding: '5px' }}>
					{row.thumbnail.src ? (
						<Image
							src={row.thumbnail}
							alt='product pic'
							className='rounded-full'
						/>
					) : (
						<Image
							src={row.thumbnail}
							alt='product pic'
							width={50}
							height={50}
							className='rounded-full'
						/>
					)}
				</div>
			),
		},
		{
			name: 'Category',
			selector: (row) => row.category,
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Reg Price',
			selector: (row) => <div>৳ {row.prices.regular_price}</div>,
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Sale Price',
			selector: (row) => <div>৳ {row.prices.sale_price}</div>,
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Available',
			selector: (row) =>
				row.stock_available > 0 ? (
					<div id='green_signal_status'>{row.stock_available} kg</div>
				) : (
					<div id='green_signal_status'>✖</div>
				),
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Status',
			selector: (row) =>
				row.product_status === 'in-stock' ? (
					<div id='green_signal_status'>{row.product_status}</div>
				) : (
					<div id='red_signal_status'>{row.product_status}</div>
				),
			sortable: true,
			sortFunction: productSort,
		},
		{
			name: 'Type',
			selector: (row) =>
				row.product_type === 'on-sale' ? (
					<div id='info_signal_status'>{row.product_type}</div>
				) : (
					<div id='warning_signal_status'>{row.product_type}</div>
				),
			sortable: true,
			sortFunction: productSort,
		},
	];

	return { UserProductTableColumns };
};

// user ordered products table config and columns here
export const UserOrderedTableConfig = (handleModal) => {
	const orderStatus = (cell) => {
		if (cell === 'canceled') {
			return (
				<div id='red_signal_status'>
					<MdOutlineCancel size={16} /> cancel
				</div>
			);
		} else if (cell === 'shipped') {
			return (
				<div id='green_signal_status'>
					<MdOfflinePin size={16} /> shiped
				</div>
			);
		} else if (cell === 'pendding') {
			return (
				<div id='warning_signal_status'>
					<FiLoader size={16} /> pending
				</div>
			);
		} else if (cell === 'inprogress') {
			return (
				<div id='info_signal_status'>
					<VscServerProcess size={16} /> process
				</div>
			);
		}
	};

	const UserOrderedTableColumns = [
		{
			name: 'CM Name',
			selector: (row) => (
				<div className='!capitalize'>{row.customer_info.customer_name}</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'CM Mobile',
			selector: (row) => (
				<div className='!capitalize'>{row.customer_info.customer_mobile}</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Order Date',
			selector: (row) => (
				<div>
					{row.order_overview.order_date.date}{' '}
					{month_name[row.order_overview.order_date.month]}{' '}
					{row.order_overview.order_date.year}
				</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Total Amount',
			selector: (row) => (
				<div className='!capitalize font-semibold'>
					৳ {row.order_overview.total_amount}
				</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Payment Status',
			selector: (row) =>
				row.payment_info.payment_status === 'due' ? (
					<div id='red_signal_status'>
						<MdOutlineMoneyOff size='16' /> {row.payment_info.payment_status}
					</div>
				) : (
					<div id='green_signal_status'>
						<MdOutlinePaid size='16' /> {row.payment_info.payment_status}
					</div>
				),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Status',
			selector: (row) => orderStatus(row.order_overview.order_status),
			sortable: true,
			sortFunction: orderSort,
		},

		{
			name: 'Action',
			selector: (row) => (
				<button
					id='action_btn_icon'
					style={{ background: '#2bd891', color: 'white' }}
					onClick={() => {
						handleModal(row.products_data);
					}}
				>
					<MdOutlinePlaylistAdd size={20} />
					&nbsp;Details
				</button>
			),
		},
	];

	return { UserOrderedTableColumns };
};

// user active orders
export const UserActiveOrdersTableConfig = (handleCancelOrder, handleModal) => {
	const UserActiveOrdersTableColumns = [
		{
			name: 'Order Id',
			selector: (row) => (
				<div className='!capitalize text-normal font-bold'>
					#{row?._id?.slice(0, 10)}
				</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Order Date',
			selector: (row) => (
				<div>
					{row.order_overview.order_date.date}{' '}
					{month_name[row.order_overview.order_date.month - 1]}{' '}
					{row.order_overview.order_date.year}
				</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Total Amount',
			selector: (row) => (
				<div className='!capitalize font-semibold'>
					৳ {row.order_overview.total_amount}
				</div>
			),
			sortable: true,
			sortFunction: orderSort,
		},
		{
			name: 'Payment Status',
			selector: (row) =>
				row.payment_info.payment_status === 'due' ? (
					<div id='red_signal_status'>
						<MdOutlineMoneyOff size='16' /> {row.payment_info.payment_status}
					</div>
				) : (
					<div id='green_signal_status'>
						<MdOutlinePaid size='16' /> {row.payment_info.payment_status}
					</div>
				),
			sortable: true,
			sortFunction: orderSort,
		},

		{
			name: 'Action',
			selector: (row) => (
				<ActionToUser
					api_url={`user_dashboard_api/manage_orders/cancel_order/${row._id}`}
					id={row._id}
					status={row.payment_info.payment_status}
					handleCancel={handleCancelOrder}
					handleModal={handleModal}
					net_total={row.order_overview.total_amount}
				/>
			),
		},
	];

	return { UserActiveOrdersTableColumns };
};
