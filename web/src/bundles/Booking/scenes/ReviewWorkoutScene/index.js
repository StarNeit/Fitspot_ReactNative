import React from 'react'
import ReviewWorkoutContainer from '@Booking/containers/ReviewWorkoutContainer'
import BookingHeaderContainer from '@Booking/containers/BookingHeaderContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ReviewWorkoutScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <BookingHeaderContainer />
      <PageContent>
        <ReviewWorkoutContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default ReviewWorkoutScene
