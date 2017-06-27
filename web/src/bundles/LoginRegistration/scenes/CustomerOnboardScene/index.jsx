import React from 'react';
import CustomerOnboardContainer from '@LoginRegistration/containers/CustomerOnboardContainer';
import { Page, PageUnauthorizedHeader, PageContent } from '@shared/components';

const CustomerOnboardScene = () => {
  return (
    <Page className="login-page">
      <PageUnauthorizedHeader />
      <PageContent>
        <CustomerOnboardContainer />
      </PageContent>
    </Page>
  );
};

export default CustomerOnboardScene;
