import React from 'react';
import LoginInfoContainer from '@LoginRegistration/containers/LoginInfoContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';

const LoginInfoScene = () => {
  return (
    <Page className="login-page">
      <PageUnauthorizedHeader />
      <PageContent>
        <LoginInfoContainer />
      </PageContent>
    </Page>
  );
};

export default LoginInfoScene;
