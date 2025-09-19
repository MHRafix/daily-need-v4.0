import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { gqlRequest } from '../../lib/api-client';
import { All_Products_Query, Place_Order_Mutation } from '../../lib/gql';
import { FormButton, FormTextArea, FormTextField } from './FormField';
import PriceAndReview from './PriceAndReview';
import ProductDetails from './ProductDetails';
import VideoAndHeading from './VideoAndHeading';

export default function HomeMain() {
	const [productData, setProductData] = useState();
	const navigate = useRouter();

	const form = useForm({
		// @ts-ignore
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			quantity: 1,
			code: '',
			specialNote: '', // 👈 now optional
		},
	});

	const placeOrder = useMutation({
		mutationFn: async (payload) => {
			await gqlRequest({
				query: Place_Order_Mutation,
				variables: payload,
			});

			trackEvent('Purchase', {
				value: payload?.payload?.total,
				currency: 'BDT',
				content_ids: [productFetchedData?._id],
				contents: payload?.payload?.items?.map((item) => ({
					code: item?.code,
					quantity: item?.quantity,
					item_price: item?.price,
					id: item?.product,
				})),
			});
		},
		onSuccess(data) {
			toast.success('Order has been placed.');
			navigate.push(`/order-success?orderId=${data?.placeOrder?._id}`);
		},
	});

	const { data: productFetchedData } = useQuery({
		queryKey: ['All_Products_Query'],
		queryFn: async () => {
			const res = await gqlRequest({
				query: All_Products_Query,
				variables: {
					orgUid: process.env.NEXT_PUBLIC_ANALYTICS_ORGANIZATION_UID,
				},
			});
			return res?.products?.nodes?.[0];
		},
	});

	// ✅ submit handler
	const onSubmit = (productData) => {
		const productPrice = priceByQuantity(data?.quantity, productData);

		const payload = {
			payload: {
				items: [
					{
						product: productFetchedData?._id,
						price: productPrice,
						quantity: data?.quantity,
						code: data?.code,
						subtotal: productPrice,
					},
				],
				status: OrderStatus.Pending,
				billing: {
					name: data?.name,
					phone: data?.phone,
					address: data?.address,
				},
				specialNote: data?.specialNote,
				total: productPrice,
				deliveryFee: 0,
				payment: {
					amount: productPrice,
					method: PaymentMethod.CashOnDelivery,
					status: PaymentStatus.Due,
				},
				orgUID: process.env.NEXT_PUBLIC_ANALYTICS_ORGANIZATION_UID,
			},
		};
		placeOrder?.mutate(payload);
	};

	useEffect(() => {
		fetch(
			'https://raw.githubusercontent.com/MHRafix/rihla-mart-data/main/data.json'
		)
			.then((res) => res.json())
			.then((data) => {
				setProductData(data);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<VideoAndHeading />
			<ProductDetails
				productData={productData}
				productFetchedData={productFetchedData}
			/>
			<PriceAndReview productData={productData} />

			<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-4'>
				<p className='text-md text-amber-500 leading-12'>✅ ২ পিস ১৭০০</p>
				<p className='text-md text-amber-500 leading-12'>✅ ৩ পিস ২৪৫০</p>
				<p className='text-md text-amber-500 leading-12'>✅ ৪ পিস ৩২০০</p>

				<h2 className='mt-3 text-lg font-medium bg-amber-800 p-2 rounded-xl'>
					✅ পাইকারি নিতে কল করুন {productData?.whatsappNumber}
				</h2>
			</section>
			<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-4'>
				<h1 className='text-3xl text-amber-500 leading-12'>
					😍 ডেলিভারি চার্জ <br /> ফ্রি 😍
				</h1>

				<h2 className='mt-3 text-xl font-medium leading-8'>
					অগ্রিম কোন টাকা দিতে হবে না। পার্সেল হাতে বুঝে পেয়ে, চেক করে তারপর
					ডেলিভারি ম্যানের কাছে টাকা পরিশোধ করতে পারবেন।
				</h2>
			</section>
			<section className='mx-4 py-3'>
				<div className='bg-white text-purple-950 border shadow-sm mx-auto'>
					<div className='px-4 space-y-4'>
						<h3 className='text-2xl font-bold text-center'>অর্ডার করুন এখনই</h3>

						<form // @ts-ignore
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4'
						>
							{/* Name */}
							<FormTextField
								form_label={'আপনার নাম'} // @ts-ignore
								disabled={false}
								form={form}
								required={true}
								name='name'
							/>
							{/* name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											আপনার নাম <span className='text-red-500'>*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder='আপনার নাম'
												{...field}
												className='py-6'
												disabled={placeOrder.isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem> */}
							{/* Phone */}
							<FormTextField
								form_label={'মোবাইল নাম্বার'} // @ts-ignore
								name='phone'
								disabled={false}
								form={form}
								required={true}
							/>
							<FormTextArea
								form_label={'ঠিকানা - (জেলা, থানা, পোস্ট/ইউনিয়ন, গ্রাম)'} // @ts-ignore
								name='address'
								disabled={false}
								form={form}
								required={true}
							/>
							{/* Quantity with stepper */}
							<div>
								<span>
									কোয়ান্টিটি <span className='text-red-500'>*</span>
								</span>
								<div className='grid grid-cols-3 w-full border rounded-xl overflow-hidden'>
									<button
										type='button'
										variant='ghost'
										className='rounded-none bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-6'
										onClick={() =>
											form.setValue(
												'quantity',
												Math.max(1, (form.watch('quantity') ?? 1) - 1)
											)
										}
										disabled={
											form.watch('quantity') === 1 || placeOrder.isPending
										}
									>
										➖
									</button>
									<div className='flex items-center justify-center bg-white font-semibold'>
										{form.watch('quantity')}
									</div>
									<button
										type='button'
										variant='ghost'
										className='rounded-none bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-6'
										onClick={() =>
											form.setValue('quantity', (field.value ?? 1) + 1)
										}
										disabled={
											form.watch('quantity') === 4 || placeOrder.isPending
										}
									>
										➕
									</button>
								</div>
							</div>
							<FormTextField
								form_label={'প্রোডাক্ট কোড'} // @ts-ignore
								name='code'
								disabled={false}
								form={form}
								required={true}
							/>{' '}
							<FormTextArea
								form_label={'অতিরিক্ত নোট (অপশনাল)'} // @ts-ignore
								name='specialNote'
								disabled={false}
								form={form}
								required={true}
							/>
							<div className='text-purple-950 bg-white p-4 rounded-xl border border-purple-950 space-y-2'>
								<h2 className='text-lg font-semibold text-center'>
									অর্ডার সারাংশ
								</h2>
								<div className='flex justify-between text-base'>
									<span className='text-lg font-medium'>একক মূল্য:</span>
									<span className='text-lg font-medium'>
										<span className='font-extrabold'>৳</span> 900
									</span>
								</div>
								<div className='flex justify-between text-base'>
									<span className='text-lg font-medium'>কোয়ান্টিটি:</span>
									<span className='text-lg font-medium'>
										{form.watch('quantity')}
									</span>
								</div>
								<div className='flex justify-between text-base'>
									<span className='text-lg font-medium'>ডিসকাউন্ট:</span>
									<span className='font-extrabold'>
										৳{' '}
										{(form.watch('quantity') === 2 && 100) ||
											(form.watch('quantity') === 3 && 250) ||
											(form.watch('quantity') === 4 && 400) ||
											0.0}
									</span>
								</div>
								<hr className='border-purple-300 my-2' />
								<div className='flex justify-between text-xl font-bold'>
									<span>মোট টাকা:</span>
									<span className='font-extrabold'>
										৳{' '}
										{(form.watch('quantity') === 1 && 900) ||
											(form.watch('quantity') === 2 && 1700) ||
											(form.watch('quantity') === 3 && 2450) ||
											(form.watch('quantity') === 4 && 3200)}
									</span>
								</div>
							</div>
							<FormButton
								btn_name={'অর্ডার কনফার্ম করুন'}
								disable={placeOrder.isPending}
								processing={placeOrder.isPending}
								type='submit'
								className='w-full bg-purple-950 text-white font-bold py-7 cursor-pointer text-xl'
								disabled={placeOrder.isPending}
							/>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}

const priceByQuantity = (quantity, productData) => {
	switch (quantity) {
		case 1:
			return productData?.unitPrice;
		case 2:
			return productData?.priceFor2product;
		case 3:
			return productData?.priceFor3product;
		case 4:
			return productData?.priceFor4product;

		default:
			break;
	}
};

// ✅ Yup validation schema
const schema = yup.object({
	name: yup.string().required('আপনার নাম দিন'),
	phone: yup
		.string()
		.required('মোবাইল নাম্বার দিন')
		.matches(/^(?:\+?88)?01[3-9]\d{8}$/, 'সঠিক মোবাইল নাম্বার দিন'),
	address: yup.string().required('ঠিকানা দিন'),
	quantity: yup
		.number()
		.typeError('সংখ্যা দিন')
		.min(1, 'কমপক্ষে ১ টি দিতে হবে')
		.required('কমপক্ষে ১ টি দিতে হবে'),
	code: yup.string().required('প্রোডাক্ট কোড দিন'),
	extraNote: yup
		.string()
		.transform((val) => (val === '' ? undefined : val)) // 👈 fix for optional
		.optional(),
});
