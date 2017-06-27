/* @flow */

import React from 'react'
import ChooseLocationContainer from '@Booking/containers/ChooseLocationContainer'
import BookingHeaderContainer from '@Booking/containers/BookingHeaderContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChooseLocationScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <BookingHeaderContainer />
      <PageContent>
         <ChooseLocationContainer />
      </PageContent>
    </SecurePageContainer>
  )
}
export default ChooseLocationScene
