// user data sortere here
export const UserSorter = ({ dependency }) => {
	const { handleSearchFilter, handleUserFilter, handleResetFilter, active } =
		dependency;

	return (
		<div id='table_sorter_wrapper'>
			<div id='sorter_input_wrapper'>
				<input
					type='search'
					placeholder='Name filter...'
					className='sorting_input lg:!w-80 xs:w-full'
					onChange={handleSearchFilter}
				/>
			</div>

			<div id='table_data_filter_wrapper'>
				<div
					id={active === 'reset' ? 'filter_btn_active' : 'filter_btn'}
					onClick={() => handleResetFilter('reset')}
				>
					<button>All</button>
				</div>
				<div
					id={active === 'customer' ? 'filter_btn_active' : 'filter_btn'}
					onClick={() => handleUserFilter('customer', 'customer')}
				>
					<button>Customer</button>
				</div>
				<div
					id={active === 'admin' ? 'filter_btn_active' : 'filter_btn'}
					onClick={() => handleUserFilter('admin', 'admin')}
				>
					<button>Admin</button>
				</div>
				<div
					id={active === 'moderator' ? 'filter_btn_active' : 'filter_btn'}
					onClick={() => handleUserFilter('moderator', 'moderator')}
				>
					<button>Moderator</button>
				</div>
				{/* <div
					id={active === 'vendor' ? 'filter_btn_active' : 'filter_btn'}
					onClick={() => handleUserFilter('vendor', 'vendor')}
				>
					<button>Vendor</button>
				</div> */}
			</div>
		</div>
	);
};

// product data and orders data sorter
export const ProductSorter = ({ dependency, isProduct }) => {
	const {
		handleSearchFilter,
		handleTypeFilter,
		handleStatusFilter,
		handleResetFilter,
		active,
	} = dependency;

	return (
		<div id='table_sorter_wrapper'>
			<div id='sorter_input_wrapper'>
				<input
					type='search'
					placeholder='Name filter...'
					className='sorting_input lg:!w-80 xs:w-full'
					onChange={handleSearchFilter}
				/>
			</div>

			{isProduct ? (
				<div id='table_data_filter_wrapper'>
					<div
						id={active === 'reset' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleResetFilter('reset')}
					>
						<button>All</button>
					</div>
					<div
						id={active === 'fixed-sale' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleTypeFilter('fixed-sale', 'fixed-sale')}
					>
						<button>Fixed</button>
					</div>
					<div
						id={active === 'on-sale' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleTypeFilter('on-sale', 'on-sale')}
					>
						<button>Sale</button>
					</div>
					<div
						id={active === 'in-stock' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleStatusFilter('in-stock', 'in-stock')}
					>
						<button>In-Stock</button>
					</div>
					<div
						id={active === 'stock-out' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleStatusFilter('stock-out', 'stock-out')}
					>
						<button>Stock-Out</button>
					</div>
				</div>
			) : (
				<div id='table_data_filter_wrapper'>
					<div
						id={active === 'reset' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleResetFilter('reset')}
					>
						<button>All</button>
					</div>
					<div
						id={active === 'shipped' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleStatusFilter('shipped', 'shipped')}
					>
						<button>Shipped</button>
					</div>
					<div
						id={active === 'canceled' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleStatusFilter('canceled', 'canceled')}
					>
						<button>Cancel</button>
					</div>
					<div
						id={active === 'pendding' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleStatusFilter('pendding', 'pendding')}
					>
						<button>Pending</button>
					</div>
					<div
						id={active === 'inprogress' ? 'filter_btn_active' : 'filter_btn'}
						onClick={() => handleStatusFilter('inprogress', 'inprogress')}
					>
						<button>Process</button>
					</div>
				</div>
			)}
		</div>
	);
};
