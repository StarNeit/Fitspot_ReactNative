import React from 'react'
import AddFriendsContainer from '@Booking/containers/AddFriendsContainer'
import BookingHeaderContainer from '@Booking/containers/BookingHeaderContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const AddFriendsScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <BookingHeaderContainer />
      <PageContent>
        <AddFriendsContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default AddFriendsScene
