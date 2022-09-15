import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import avatarUploader from '../../../hooks/cloudinary_uploader/avatarUploader';
import imageUploader from '../../../hooks/cloudinary_uploader/imageUploader';
import sliderImageUploader from '../../../hooks/cloudinary_uploader/sliderImageUploader';
import { addSingleReview } from '../../../redux/all_data/action';
import { reduceCookie } from '../../../redux/cart_products/action';
import { reqSender } from './reqSender';

// login form validator
export const LoginFormValidator = () => {
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('false');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);

	// initial vlaue of form
	const initialValues = {
		user_email: '',
		user_password: '',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		user_email: Yup.string()
			.email('Invalid email format!')
			.required('Required!'),
		user_password: Yup.string().required('Required!'),
	});

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		if (values) {
			reqSender(
				values,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'my_account/signin_api'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

// registration form validator
export const RegistrationFormValidator = () => {
	const [userpic, setUserpic] = useState('');
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('false');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);

	// initial vlaue of form
	const initialValues = {
		user_name: '',
		user_email: '',
		user_password: '',
		cnf_password: '',
		user_admin: false,
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		user_name: Yup.string().required('Required!'),
		user_email: Yup.string()
			.email('Invalid email format!')
			.required('Required!'),
		user_password: Yup.string().required('Required'),
		cnf_password: Yup.string()
			.oneOf([Yup.ref('user_password'), ''], "Passwords didn't matched!")
			.required('Required'),
	});

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		const { user_name, user_email, user_password, user_admin } = values;

		// upload user avatarto cloudinary
		const { avatar_upload_cloudinary } = avatarUploader(userpic);
		const user_avatar = await avatar_upload_cloudinary();

		// make user data obj
		const user_data = {
			user_name,
			user_email,
			user_password,
			user_admin,
			user_pic: user_avatar,
		};

		if (user_data) {
			reqSender(
				user_data,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'my_account/signup_api'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		setUserpic,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

// checkout form validator
export const CheckoutFormValidator = (products_data, net_total) => {
	const [paypalModal, setPaypalModal] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);
	const [orderid, setOrderid] = useState('');
	const dispatch = useDispatch();
	const router = useRouter();
	const empty_data = [];

	// loggedin user info and form data state
	const userInfo =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	// initial vlaue of form
	const initialValues = {
		customer_name: userInfo?.user_name,
		customer_email: userInfo?.user_email,
		customer_mobile: '',
		customer_country: '',
		customer_district: '',
		customer_street: '',
		payment_method: 'cash-on',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		customer_name: Yup.string().required('Required!'),
		customer_email: Yup.string()
			.email('Invalid email format!')
			.required('Required!'),
		customer_mobile: Yup.string().required('Required!'),
		customer_country: Yup.string().required('Required!'),
		customer_district: Yup.string().required('Required!'),
		customer_street: Yup.string().required('Required!'),
		payment_method: Yup.string().required('Required!'),
	});

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		// destreucture the form values
		const {
			customer_name,
			customer_email,
			customer_mobile,
			customer_country,
			customer_district,
			customer_street,
			payment_method,
		} = values;

		// make a user data object for ordering the products
		const order_data = {
			products_data,
			user_email: userInfo?.user_email,
			customer_info: {
				customer_name,
				customer_email,
				customer_mobile,
				customer_country,
				customer_district,
				customer_street,
			},

			order_overview: {
				order_status: 'pendding',
				total_amount: net_total,
				total_qty: products_data?.length,
				order_date: {
					date: new Date().getDate(),
					month: new Date().getMonth() + 1,
					year: new Date().getFullYear(),
				},
			},

			payment_info: {
				payment_method,
				payment_status: 'due',
				customer_name,
				customer_email,
				customer_mobile,
				payment_amount: net_total,
				card_name: payment_method,
				created: 'null',
				last4: 'null',
				transaction: 'null',
				order_id: 'null',
			},
		};

		if (order_data) {
			try {
				setPaypalModal(false);

				const { data } = await axios.post(
					'/api/checkout/place_order',
					order_data
				);

				if (data?.success) {
					setToastOn(true);
					setProcessing(false);
					resetForm({ values: '' });
					resetForm({ values: '' });
					setToastText(data.success);
					setToastType('success_toast');
					Cookie.remove('cart_product_ids');

					setTimeout(() => {
						if (payment_method === 'cash-on') {
							router.push('/shop/grid_shop');
							dispatch(reduceCookie(empty_data));
						} else {
							setOrderid(data?.order_id);
							setPaypalModal(true);
						}
					}, 2000);
				} else {
					setToastOn(true);
					setProcessing(false);
					setToastText(data.error);
					resetForm({ values: '' });
					setToastType('error_toast');
				}
			} catch (error) {
				setToastOn(true);
				setProcessing(false);
				resetForm({ values: '' });
				setToastText(error.message);
				setToastType('error_toast');
			}
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
		paypalModal,
		orderid,
	};
};

// stripe payment form validator here
export const PaymentFormValidator = (clientSecret) => {
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);
	const Router = useRouter();

	// initial vlaue of form
	const initialValues = {
		customer_name: '',
		customer_email: '',
		customer_phone: '',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		customer_name: Yup.string().required('Required!'),
		customer_email: Yup.string()
			.email('Invalid email format!')
			.required('Required!'),
		customer_phone: Yup.string().required('Required!'),
	});

	// use stripe and elements
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const empty_data = [];

	// Handle crdit card form
	const onSubmit = async (values, { resetForm }) => {
		const { customer_name, customer_email, customer_phone } = values;

		// Conditionaly payment
		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (card === null) {
			return;
		}

		setProcessing(true);
		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		if (error) {
			setToastOn(true);
			setProcessing(false);
			setToastText(error.message);
			setToastType('error_toast');
			resetForm({ values: '' });
		} else {
			setToastText('');
		}

		// Paymey intent
		const { paymentIntent, error: intentError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
				},
			});

		if (intentError) {
			setToastOn(true);
			setProcessing(false);
			setToastType('error_toast');
			setToastText(intentError.message);
			resetForm({ values: '' });
		} else {
			// Save to database
			const payment_info = {
				payment_method: 'stripe card',
				payment_status: 'paid',
				customer_name,
				customer_email,
				customer_phone,
				payment_amount: paymentIntent.amount,
				card_name: paymentMethod.card.brand,
				created: paymentIntent.created,
				last4: paymentMethod.card.last4,
				transaction: paymentIntent.client_secret.slice('_secret')[0],
				order_id: `#59${order_id.slice(0, 3)}`,
			};

			const url = '/api/manage_orders/update_order';
			fetch(url, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(payment_info),
			})
				.then((res) => res.json())
				.then((data) => {
					setToastOn(true);
					setProcessing(false);
					setToastType('success_toast');
					setToastText('Your payment successfully proccesed!');
					resetForm({ values: '' }); // form reset
					dispatch(reduceCookie(empty_data));
				});

			const redirect = () => {
				Router.push('/my_account/my_profile/dashboard');
			};

			setTimeout(redirect, 2000);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

/**
 *
 * admin pannel validators
 * admin login validators here
 *
 */

// add products form validator
export const AddProductsFormValidator = () => {
	const userInfo = useSelector((state) => state.users.loggedin_user);
	const [thumbnail, setThumbnail] = useState('');
	const [bigThumbnail, setBigThumbnail] = useState('');
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('false');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);

	// initial vlaue of form
	const initialValues = {
		title: '',
		slug: '',
		category: 'fruits',
		regular_price: 10,
		sale_price: 0,
		stock_available: 5,
		description: '',
		weight: 1,
		tags: '',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		title: Yup.string().required('Required! '),
		slug: Yup.string().required('Required! '),
		regular_price: Yup.number().min(2).required('Required!'),
		sale_price: Yup.number().required('Required!'),
		stock_available: Yup.string().required('Required!'),
		description: Yup.string().required('Required!'),
		weight: Yup.number().min(1).required('Required!'),
		tags: Yup.string().required('Required!'),
	});

	// author info
	const author_info = {
		author_id: userInfo?._id,
		author_email: userInfo?.user_email,
		author_image: userInfo?.user_pic,
	};

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		// destreucture values here
		const {
			title,
			slug,
			regular_price,
			sale_price,
			description,
			weight,
			tags,
			stock_available,
			category,
		} = values;

		// price validation here
		if (sale_price > regular_price) {
			setProcessing(false);
			setToastType('error_toast');
			setToastOn(true);
			setToastText('Sale price should be less than regulat price!');
		}

		// image uploader hook import here
		const { image_upload_cloudinary } = imageUploader(thumbnail, bigThumbnail);
		const { small_thumbnail, big_thumbnail } = await image_upload_cloudinary();

		// make product data here
		const products_data = {
			title,
			slug,
			thumbnail: small_thumbnail,
			thumbnail_big: big_thumbnail,
			category,
			prices: { regular_price, sale_price },
			reviews_ratings: [{ rating: 5, review: 'Recomended for every one' }],
			stock_available,
			sold_quantity: 0,
			additional_info: { description, weight, tags },
			product_status: stock_available > 0 ? 'in-stock' : 'stock-out',
			product_type: sale_price > 0 ? 'on-sale' : 'fixed-sale',
			author_info,
		};

		if (products_data) {
			reqSender(
				products_data,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'add_products'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		setThumbnail,
		setBigThumbnail,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

// add products form validator
export const AddLimitedProductsFormValidator = () => {
	const [thumbnail, setThumbnail] = useState('');
	const [bigThumbnail, setBigThumbnail] = useState('');
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('false');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);

	// initial vlaue of form
	const initialValues = {
		title: '',
		slug: '',
		category: 'fruits',
		offer_end: '',
		regular_price: 10,
		sale_price: 0,
		stock_available: 5,
		description: '',
		weight: 1,
		tags: '',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		title: Yup.string().required('Required! '),
		slug: Yup.string().required('Required! '),
		category: Yup.string().required('Required! '),
		offer_end: Yup.date().min(new Date()).required('Required! '),
		regular_price: Yup.number().min(2).required('Required!'),
		sale_price: Yup.number().required('Required!'),
		stock_available: Yup.string().required('Required!'),
		description: Yup.string().required('Required!'),
		weight: Yup.number().min(1).required('Required!'),
		tags: Yup.string().required('Required!'),
	});

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		// destreucture values here
		const {
			title,
			slug,
			category,
			offer_end,
			regular_price,
			sale_price,
			description,
			weight,
			tags,
			stock_available,
		} = values;

		// price validation here
		if (sale_price > regular_price) {
			setProcessing(false);
			setToastType('error_toast');
			setToastOn(true);
			setToastText('Sale price should be less than regulat price!');
		}

		// offer days calculation here
		const current_date = new Date().getDate();
		const offer_end_date = offer_end.slice(8, 10);
		const offer_days = offer_end_date - current_date;
		const end_time = 86400000000 * offer_days;

		// avatar uploader hook import here
		const { image_upload_cloudinary } = imageUploader(thumbnail, bigThumbnail);
		const { small_thumbnail, big_thumbnail } = await image_upload_cloudinary();

		// make product data here
		const products_data = {
			title,
			slug,
			thumbnail: small_thumbnail,
			thumbnail_big: big_thumbnail,
			category,
			offer_end: end_time,
			prices: { regular_price, sale_price },
			reviews_ratings: [
				{
					customer_name: 'null',
					customer_email: 'null',
					rating: 0,
					review: 'null',
				},
			],
			stock_available,
			sold_quantity: 0,
			additional_info: { description, weight, tags },
			product_status: stock_available > 0 ? 'in-stock' : 'stock-out',
			product_type: 'flash-sale',
		};

		if (products_data) {
			reqSender(
				products_data,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'add_limited_products'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		setThumbnail,
		setBigThumbnail,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

// add review and rating form validator
export const AddReviewRatingFormValidator = (product_id, product_slug) => {
	const [productPic, setProductPic] = useState('');
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);
	const dispatch = useDispatch();

	const userInfo =
		Cookie.get('user_information') &&
		JSON.parse(Cookie.get('user_information'));

	const initialValues = {
		customer_name: userInfo?.user_name,
		customer_email: userInfo?.user_email,
		customer_pic: userInfo?.user_pic,
		rating: 4.5,
		review: '',
	};

	const validationSchema = Yup.object({
		customer_name: Yup.string().required('Required!'),
		rating: Yup.number().min(1).max(5).required('Required!'),
		review: Yup.string().required('Required!'),
	});

	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		const { customer_name, customer_email, customer_pic, rating, review } =
			values;

		const { avatar_upload_cloudinary } = avatarUploader(productPic);
		const product_pic = await avatar_upload_cloudinary();
		const date = new Date();
		// make review data
		const review_data = {
			product_id,
			product_slug,
			customer_name,
			customer_email,
			customer_pic,
			rating,
			review,
			product_pic,
			review_date: {
				current_date: date.getDate(),
				current_month: date.getMonth() + 1,
				current_year: date.getFullYear(),
			},
		};

		if (review_data) {
			// set to redux first
			dispatch(addSingleReview(review_data));
			reqSender(
				review_data,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'manage_reviews/add_reviews'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		setProductPic,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

export const AdminLoginFormValidator = () => {
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);

	// initial vlaue of form
	const initialValues = {
		user_email: '',
		user_password: '',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		user_email: Yup.string()
			.email('Invalid email format!')
			.required('Required!'),
		user_password: Yup.string().required('Required'),
	});

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		if (values) {
			reqSender(
				values,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'admin_pannel_api/authentication/admin_login'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

// create admin and moderators validators here
export const CreateAdminFormValidator = () => {
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);

	// initial vlaue of form
	const initialValues = {
		user_name: '',
		user_email: '',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		user_name: Yup.string().required('Required'),
		user_email: Yup.string()
			.email('Invalid email format!')
			.required('Required!'),
	});

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		if (values) {
			reqSender(
				values,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'admin_pannel_api/authentication/create_admin'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

/**
 * category form validator here
 * cat image upload
 */

// add category form validator
export const AddCategoryFormValidator = () => {
	const [catImg, setCatImg] = useState('');
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('false');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);

	// initial vlaue of form
	const initialValues = {
		cat_name: '',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		cat_name: Yup.string().required('Required!'),
	});

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		const { cat_name } = values;

		// upload user avatarto cloudinary
		const { avatar_upload_cloudinary } = avatarUploader(catImg);
		const cat_image = await avatar_upload_cloudinary();

		// make user data obj
		const cat_data = {
			category: cat_name,
			cat_name2: cat_name,
			cat_name,
			cat_image,
		};

		if (cat_data) {
			reqSender(
				cat_data,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'admin_pannel_api/manage_category/add_category'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		setCatImg,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

// add slider form validator
export const AddHomeSliderFormValidator = () => {
	const [sliderImg, setSliderImg] = useState('');
	const [processing, setProcessing] = useState(false);
	const [toastText, setToastText] = useState('');
	const [toastType, setToastType] = useState('');
	const [toastOn, setToastOn] = useState(false);

	// initial vlaue of form
	const initialValues = {
		image_name: '',
	};

	// validation schema using formik yup
	const validationSchema = Yup.object({
		image_name: Yup.string().required('Required!'),
	});

	// on submit function here
	const onSubmit = async (values, { resetForm }) => {
		setProcessing(true);

		const { image_name } = values;

		// upload user avatarto cloudinary
		const { slider_upload_cloudinary } = sliderImageUploader(sliderImg);
		const slider_image = await slider_upload_cloudinary();

		// make user data obj
		const slider_data = {
			image_name,
			slider_image,
		};

		if (slider_data) {
			reqSender(
				slider_data,
				resetForm,
				setProcessing,
				setToastText,
				setToastType,
				setToastOn,
				'admin_pannel_api/manage_slider/home_slider/add_home_slider'
			);
		}
	};

	return {
		initialValues,
		validationSchema,
		onSubmit,
		setSliderImg,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	};
};

// add brand slider image form validator
export const AddBrandSliderFormValidator = () => {
	const [brandImg, setBrandImg] = useState('');
	const [processingBrand, setProcessingBrand] = useState(false);
	const [toastTextBrand, setToastTextBrand] = useState('');
	const [toastTypeBrand, setToastTypeBrand] = useState('');
	const [toastOnBrand, setToastOnBrand] = useState(false);

	// initial vlaue of form
	const initialValuesBrand = {
		brand_name: '',
	};

	// validation schema using formik yup
	const validationSchemaBrand = Yup.object({
		brand_name: Yup.string().required('Required!'),
	});

	// on submit function here
	const onSubmitBrand = async (values, { resetForm }) => {
		setProcessingBrand(true);

		const { brand_name } = values;

		// upload user avatarto cloudinary
		const { slider_upload_cloudinary } = sliderImageUploader(brandImg);
		const brand_image = await slider_upload_cloudinary();

		// make user data obj
		const brand_data = {
			brand_name,
			brand_image,
		};

		if (brand_data) {
			reqSender(
				brand_data,
				resetForm,
				setProcessingBrand,
				setToastTextBrand,
				setToastTypeBrand,
				setToastOnBrand,
				'admin_pannel_api/manage_slider/brand_slider/add_brand_slider'
			);
		}
	};

	return {
		initialValuesBrand,
		validationSchemaBrand,
		onSubmitBrand,
		setBrandImg,
		processingBrand,
		toastTextBrand,
		toastTypeBrand,
		toastOnBrand,
		setToastOnBrand,
	};
};
