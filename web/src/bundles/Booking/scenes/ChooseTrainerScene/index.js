/* @flow */

import React from 'react'
import ChooseTrainerContainer from '@Booking/containers/ChooseTrainerContainer'
import BookingHeaderContainer from '@Booking/containers/BookingHeaderContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChooseTrainerScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <BookingHeaderContainer />
      <PageContent>
        <ChooseTrainerContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default ChooseTrainerScene
