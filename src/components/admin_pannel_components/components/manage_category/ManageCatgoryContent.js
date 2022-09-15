import React, { useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaMinus } from 'react-icons/fa';
import useModalFilter from '../../../../hooks/filter_func/useModalFilter';
import useDeleteReq from '../../../../hooks/http_req/deleteReq';
import CategoryForm from '../../../../lib/Formik/Forms/add_category_form/CategoryForm';
import Table from '../../../../lib/Tables/table/Table';
import {
	CategoryTableConfig,
	ProductTableConfig,
} from '../../../../lib/Tables/table_config/TableColumns';
import AlertToast from '../../../../utilities/alertToast/AlertToast';
import ReactModal from '../../../../utilities/Modal/ReactModal';
import toastConfig from '../../../../utilities/toastConfig';
import DashboardContentLayout from '../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout';

export default function ManageCatgoryContent({ all_products, all_categories }) {
	const [modalData, setModalData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [modal, setModal] = useState(false);

	// handle  modal data
	const handleModal = (cat) => {
		const modal_data = all_products?.filter(
			(product) => product.category === cat
		);
		setModalData(modal_data);
		setFilterData(modal_data);
		setModal(true);
	};

	// initialize filter and sorting dependency
	const { show, sorting_dependency, handleAddFormShow } = useModalFilter(
		modalData,
		setFilterData
	);

	// delete hook
	const { toastOn, setToastOn, toastType, toastText, handleDelete } =
		useDeleteReq();

	// toast config
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	// users table config
	const { CategoryTableColumns } = CategoryTableConfig(
		handleDelete,
		all_products,
		handleModal
	);

	// modal product table
	const { ProductTableColumns } = ProductTableConfig(handleDelete);

	return (
		<>
			{/* alert toast here  */}
			{toastOn && <AlertToast toast_config={toast_config} />}
			{/* orders show on table */}
			{show && (
				<div className='dashboard_row_wrapper'>
					<DashboardContentLayout
						item_name='add category'
						btn_content={show && <FaMinus />}
						btn_id={show && 'minimize_btn'}
						handleAddItem={handleAddFormShow}
					>
						<CategoryForm />
					</DashboardContentLayout>
				</div>
			)}
			<div className='dashboard_row_wrapper'>
				<DashboardContentLayout
					item_name='category products'
					btn_content={!show && <BiCategoryAlt />}
					btn_id={!show && 'expand_btn'}
					handleAddItem={handleAddFormShow}
				>
					<Table
						table_columns={CategoryTableColumns}
						table_data={all_categories}
					/>
				</DashboardContentLayout>
				{modal && (
					<ReactModal
						setModal={setModal}
						modal_data={modalData}
						modal_title='Category Products'
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
