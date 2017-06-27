import React from 'react'
import EditProfileContainer from '@Profile/containers/EditProfileContainer'
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const EditProfileScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <PageHeaderContainer />
      <PageContent>
        <EditProfileContainer />
      </PageContent>
    </SecurePageContainer>
  )
}

export default EditProfileScene
