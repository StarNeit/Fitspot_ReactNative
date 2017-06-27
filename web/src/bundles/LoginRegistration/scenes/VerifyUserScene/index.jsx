import React from 'react';
import VerifyUserContainer from '@LoginRegistration/containers/VerifyUserContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';

const VerifyUserScene = () => {
  return (
    <Page className="login-page">
      <PageUnauthorizedHeader />
      <PageContent>
        <VerifyUserContainer />
      </PageContent>
    </Page>
  );
};

export default VerifyUserScene;
