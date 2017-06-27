import React from 'react'
import AccountSettingsContainer from '@Profile/containers/AccountSettingsContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const AccountSettingsScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <PageHeaderContainer />
      <PageContent>
        <AccountSettingsContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default AccountSettingsScene
