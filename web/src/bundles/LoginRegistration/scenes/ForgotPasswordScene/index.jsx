import React from 'react';
import ForgotPasswordContainer from '@LoginRegistration/containers/ForgotPasswordContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';

const ForgotPasswordScene = () => {
  return (
    <Page className="login-page">
      <PageUnauthorizedHeader />
      <PageContent>
        <ForgotPasswordContainer />
      </PageContent>
    </Page>
  );
};

export default ForgotPasswordScene;
