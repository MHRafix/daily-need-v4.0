import React from 'react';
import TrackingStepper from '../../../lib/react_stepper/TrackingStepper';
import ProfileContentLayout from '../../../utilities/ProfileContentLayout';

export default function TrackOrderResultContent() {
	return (
		<>
			<ProfileContentLayout content_title='Track Order Result'>
				<TrackingStepper />
			</ProfileContentLayout>
		</>
	);
}
