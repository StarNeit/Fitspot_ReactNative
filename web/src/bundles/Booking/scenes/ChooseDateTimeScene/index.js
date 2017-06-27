/* @flow */

import React from 'react'
import ChooseDateTimeContainer from '@Booking/containers/ChooseDateTimeContainer'
import BookingHeaderContainer from '@Booking/containers/BookingHeaderContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChooseDateTimeScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <BookingHeaderContainer/>
      <PageContent>
        <ChooseDateTimeContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default ChooseDateTimeScene
