import { month_name } from '../../../fake_data/all_fakedata';
import CardData from '../../../utilities/CardData';
import DataChart from '../../../utilities/GraphChart/DataChart';
import ProfileContentLayout from '../../../utilities/ProfileContentLayout';

export default function ProfileDashboardContent({ my_orders }) {
	// purchased amount summury
	const purchased_bdt = [];

	my_orders.filter((order) =>
		purchased_bdt.push(order?.order_overview?.total_amount)
	);

	// purchased date summury
	const purchased_date = [];

	my_orders.filter((order) => {
		const chart_label = `${
			month_name[order?.order_overview?.order_date?.month]
		} - ${order?.order_overview?.order_date?.date}`;
		purchased_date.push(chart_label);
	});

	// total purchased amount calculate here
	let total_purchased = 0;

	for (const bdt of purchased_bdt) {
		total_purchased = total_purchased + bdt;
	}

	// completed purchased amount calculate here
	let completed_amount = 0;

	// filter out completed orders
	const completed_orders = my_orders.filter(
		(order) => order?.order_overview?.order_status === 'completed'
	);

	// calculate here
	completed_orders.filter(
		(order) =>
			(completed_amount =
				completed_amount + order?.order_overview?.total_amount)
	);

	// in-progress purchased amount calculate here
	let inprogress_amount = 0;

	// filter out inprogress orders
	const inprogress_orders = my_orders.filter(
		(order) => order?.order_overview?.order_status === 'inprogress'
	);

	// calculate here
	inprogress_orders.filter(
		(order) =>
			(inprogress_amount =
				inprogress_amount + order?.order_overview?.total_amount)
	);

	// canceled orders purchased amount calculate here
	let canceled_amount = 0;

	// filter out inprogress orders
	const canceled_orders = my_orders.filter(
		(order) => order?.order_overview?.order_status === 'canceled'
	);

	// calculate here
	canceled_orders.filter(
		(order) =>
			(canceled_amount = canceled_amount + order?.order_overview?.total_amount)
	);

	// make payment card data
	const card_data = [];

	my_orders.filter((card_info) => {
		const order_date = `${card_info?.order_overview?.order_date?.date} / ${card_info?.order_overview?.order_date?.month} / ${card_info?.order_overview?.order_date?.year}`;

		card_data.push({
			card_name: card_info?.payment_info?.card_name,
			payment_amount: card_info?.order_overview?.total_amount,
			payment_date: order_date,
		});
	});

	//data for bar chart
	const data = {
		labels: purchased_date,
		label: 'Purchased Chart',
		datasets: [
			{
				label: '# My First Dataset',
				data: purchased_bdt,
				fill: true,
				backroundColor: 'red!',
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1,
				pointBorderColor: 'green',
				pointBackgroundColor: 'green',
			},
		],
	};
	return (
		<>
			<ProfileContentLayout content_title='profile dashboard'>
				<div id='dashboard_home_wrapper'>
					{/* topbar purchase summary start here */}
					<div id='topbar_purchase_summary'>
						<div
							id='purchase_history_amount'
							// style={{ border: "1px solid #0cc5b7" }}
						>
							<h1 id='amount_label'>৳ {total_purchased.toFixed(2)}</h1>
							<span id='hstory_name'>total purchased</span>
						</div>
						<div id='purchase_history_amount'>
							<h1 id='amount_label'>৳ {completed_amount.toFixed(2)}</h1>
							<span id='hstory_name'>completed purchased</span>
						</div>
						<div id='purchase_history_amount'>
							<h1 id='amount_label'>৳ {inprogress_amount.toFixed(2)}</h1>
							<span id='hstory_name'>inprogress purchased</span>
						</div>
						<div id='purchase_history_amount' style={{ borderRight: 'none' }}>
							<h1 id='amount_label'>৳ {canceled_amount.toFixed(2)}</h1>
							<span id='hstory_name'>canceled purchased</span>
						</div>
					</div>
					{/* topbar purchase summary end here */}
					<div className='purchased_chart_and_payment_table_wrapper'>
						<div className='purchased_chart_wrapper'>
							<h1 className='dashboard_content_title'>{data.label}</h1>

							<DataChart type='line' data={data} />
						</div>
						<div className='purchased_data_table_wrapper'>
							<h1 className='dashboard_content_title'>Payment Card</h1>
							{card_data.length ? (
								<div
									id='card_data_table'
									className='overflow-y-scroll h-per_86'
								>
									{card_data.map((card, i) => (
										<CardData key={i} card_data={card} />
									))}
								</div>
							) : (
								<h1
									className='text-normal font-normal p-1'
									style={{ color: 'red' }}
								>
									No card payment history found!
								</h1>
							)}
						</div>
					</div>
				</div>
			</ProfileContentLayout>
		</>
	);
}
