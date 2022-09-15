import Cookie from 'js-cookie';
import Breadcrumb from '../../components/commons/Breadcrumb/Breadcrumb';
import BillingDetails from './BillingDetails';

export default function CheckoutMain() {
	// user info
	const userInfo =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	return (
		<>
			<Breadcrumb bread_nav={'checkout'} />
			<BillingDetails />
		</>
	);
}
