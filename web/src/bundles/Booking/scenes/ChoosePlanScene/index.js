/* @flow */

import React from 'react'
import ChoosePlanContainer from '@Booking/containers/ChoosePlanContainer'
import BookingHeaderContainer from '@Booking/containers/BookingHeaderContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const ChoosePlanScene = (props) => {
    return (
        <SecurePageContainer location={props.location}>
            <BookingHeaderContainer />
            <PageContent>
                <ChoosePlanContainer />
            </PageContent>
        </SecurePageContainer>
    )
}

export default ChoosePlanScene
