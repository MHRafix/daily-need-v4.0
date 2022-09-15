import React from 'react';
import { RestTimeCalculator } from './RestTimeCalculator';
// import { RestTimeCalculator } from "../../utilities/count_down_timer_calculation/RestTimeCalculator";

const CountDownTimer = ({ countdownTimestampMs }) => {
	const { remainingTime } = RestTimeCalculator(countdownTimestampMs);
	return (
		<>
			<div className='rest_time_wrapper'>
				<div className='time_title'>
					<div className='rest_times'>{remainingTime?.days}</div>
					<div className='rest_times_name'>days</div>
				</div>
				<div className='timer_devider'>|</div>
				<div className='time_title'>
					<div className='rest_times'>{remainingTime?.hours}</div>
					<div className='rest_times_name'>hours</div>
				</div>
				<div className='timer_devider'>|</div>
				<div className='time_title'>
					<div className='rest_times'>{remainingTime?.minutes}</div>
					<div className='rest_times_name'>mins</div>
				</div>
				<div className='timer_devider'>|</div>
				<div className='time_title'>
					<div className='rest_times'>{remainingTime?.seconds}</div>
					<div className='rest_times_name'>secs</div>
				</div>
			</div>
		</>
	);
};

export default CountDownTimer;
