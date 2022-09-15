import React from 'react';
import { FaMinus } from 'react-icons/fa';
import DashboardContentLayout from '../../../../components/admin_pannel_components/admin_pannel_utilities/DashboardLayout/DashboardContentLayout';
import SignupForm from '../../../../components/my_account_page/SignupForm';

export default function AddUserForm({ show, handleAddFormShow }) {
	return (
		<div>
			<DashboardContentLayout
				item_name='add user'
				btn_content={show && <FaMinus />}
				btn_id={show && 'minimize_btn'}
				handleAddItem={handleAddFormShow}
			>
				<SignupForm btn_name='Create User' />
			</DashboardContentLayout>
		</div>
	);
}
