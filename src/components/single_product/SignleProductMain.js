import { ErrorMessage } from '../../utilities/AlertMessage';
import Breadcrumb from '../commons/Breadcrumb/Breadcrumb';
import AdditonalInfo from './AdditonalInfo';
import ProductView from './ProductView';

export default function SignleProductMain({ bread_string, single_product }) {
	if (!single_product) {
		return (
			<>
				<Breadcrumb bread_nav='not found' />
				<ErrorMessage message='Product not found!' />
			</>
		);
	}

	return (
		<div className='document_body'>
			<Breadcrumb bread_nav={bread_string} />
			<ProductView product={single_product} />
			<AdditonalInfo product={single_product} />
			{/* <RelatedProducts tags={single_product.additional_info.tags} /> */}
		</div>
	);
}
