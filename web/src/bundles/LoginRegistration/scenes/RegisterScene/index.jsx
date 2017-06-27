import React from 'react';
import RegisterContainer from '@LoginRegistration/containers/RegisterContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';

const RegisterScene = () => {
  return (
    <Page className="login-page">
      <PageUnauthorizedHeader />
      <PageContent>
        <RegisterContainer />
      </PageContent>
    </Page>
  );
};

export default RegisterScene;
