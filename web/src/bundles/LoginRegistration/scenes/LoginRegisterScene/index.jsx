import React from 'react';
import LoginRegisterContainer from '@LoginRegistration/containers/LoginRegisterContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';

const LoginRegisterScene = () => {
  return (
    <Page className="login-page">
      <PageUnauthorizedHeader />
      <PageContent>
        <LoginRegisterContainer />
      </PageContent>
    </Page>
  );
};

export default LoginRegisterScene;
