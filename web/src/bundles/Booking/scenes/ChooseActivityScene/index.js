/* @flow */

import React from 'react'
import ChooseActivityContainer from '@Booking/containers/ChooseActivityContainer'
import BookingHeaderContainer from '@Booking/containers/BookingHeaderContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChooseActivityScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <BookingHeaderContainer/>
      <PageContent>
        <ChooseActivityContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default ChooseActivityScene
