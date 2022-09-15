import { Formik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorMessage } from '../../utilities/AlertMessage';
import AlertToast from '../../utilities/alertToast/AlertToast';
import ReviewForm from '../../utilities/Formik/Forms/ReviewForm';
import { AddReviewRatingFormValidator } from '../../utilities/Formik/Validators/AllFormValidators';
import toastConfig from '../../utilities/toastConfig';
import AverageReview from './AverageReview';
import ReviewCard from './ReviewCard';

export default function AdditonalInfo({ product }) {
	const all_reviews = useSelector((state) => state.products.all_reviews);
	const access = useSelector((state) => state.products.cm_access);
	const { _id, slug, additional_info } = product;
	const { description, weight } = additional_info;
	const [tab, setTab] = useState(1);
	const {
		initialValues,
		validationSchema,
		onSubmit,
		setProductPic,
		processing,
		toastText,
		toastType,
		toastOn,
		setToastOn,
	} = AddReviewRatingFormValidator(_id, slug);
	const { toast_config } = toastConfig(setToastOn, toastType, toastText);

	return (
		<>
			{toastOn && <AlertToast toast_config={toast_config} />}
			<div className='additional_info_wrapper'>
				<div className='flex justify-start items-center pb-3'>
					<div>
						<button
							onClick={() => setTab(1)}
							id={tab === 1 ? 'cart_btn' : 'tab_btn'}
							className='!rounded-sm !text-light !capitalize'
						>
							description
						</button>
					</div>
					&nbsp;
					<div>
						<button
							onClick={() => setTab(2)}
							id={tab === 2 ? 'cart_btn' : 'tab_btn'}
							className='!rounded-sm !text-light !capitalize'
						>
							Additonal info
						</button>
					</div>
					&nbsp;
					<div>
						<button
							onClick={() => setTab(3)}
							id={tab === 3 ? 'cart_btn' : 'tab_btn'}
							className='!rounded-sm !text-light !capitalize'
						>
							Review
						</button>
					</div>
				</div>
				{tab === 1 ? (
					<div className='additional_info_content_wrapper'>
						<h3 className='text-semi_medium font-medium tracking-wider text-black2 mb-10'>
							Description
						</h3>
						<p>{description}</p>
					</div>
				) : null}

				{tab === 2 ? (
					<div className='additional_info_content_wrapper'>
						<h3 className='text-semi_medium font-medium tracking-wider text-black2 mb-10'>
							Additonal Information
						</h3>
						<div className='grid grid-cols-2 border border-slate-300'>
							<div className='border-r-1 border-slate-300 h-15 px-1 flex items-center'>
								Weight
							</div>
							<div className='h-15 px-1 flex items-center'>{weight} kg</div>
						</div>
					</div>
				) : null}

				{tab === 3 ? (
					<div className='additional_info_content_wrapper'>
						{access ? (
							<>
								<h3 className='text-semi_medium font-medium tracking-wider text-black2 mb-10'>
									Add Reviews and Ratings
								</h3>
								<div className='review_form my-10'>
									<Formik
										initialValues={initialValues}
										validationSchema={validationSchema}
										onSubmit={onSubmit}
									>
										<ReviewForm
											processing={processing}
											setState={setProductPic}
										/>
									</Formik>
								</div>
							</>
						) : (
							<div className='review_form my-10'>
								<h1 className='text-red-500 text-normal'>
									You have no proper access to leave review. Please order first!
								</h1>
							</div>
						)}

						{all_reviews.length ? (
							<div className='grid_layout layout_two my-15'>
								<div>
									<h3 className='text-semi_medium font-medium tracking-wider text-black2 mb-10'>
										Average Review of Product
									</h3>
									<AverageReview all_reviews={all_reviews} />
								</div>

								<div className='separate_rating'>
									<h3 className='text-semi_medium font-medium tracking-wider text-black2 mb-10'>
										All Reviews
									</h3>
									{all_reviews?.map((review) => (
										<ReviewCard key={review._id} review_data={review} />
									))}
								</div>
							</div>
						) : (
							<ErrorMessage message='No review here!' />
						)}
					</div>
				) : null}
			</div>
		</>
	);
}
