/* @flow */

import React from 'react'
import EditWorkoutContainer from '@Booking/containers/EditWorkoutContainer'
import BookingHeaderContainer from '@Booking/containers/BookingHeaderContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const EditWorkoutScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <PageHeaderContainer />
            <PageContent>
                <EditWorkoutContainer />
            </PageContent>
        </SecurePageContainer>
    )
}

export default EditWorkoutScene
