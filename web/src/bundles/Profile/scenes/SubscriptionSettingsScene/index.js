import React from 'react'
import SubscriptionSettingsContainer from '@Profile/containers/SubscriptionSettingsContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const SubscriptionSettingsScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <PageHeaderContainer />
      <PageContent>
        <SubscriptionSettingsContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default SubscriptionSettingsScene
