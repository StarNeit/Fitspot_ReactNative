import React from 'react';
import LogoutConteiner from '@LoginRegistration/containers/LogoutConteiner';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';

const LogoutScene = () => {
  return (
    <Page className="login-page">
      <PageUnauthorizedHeader />
      <PageContent>
        <LogoutConteiner />
      </PageContent>
    </Page>
  );
};

export default LogoutScene;
