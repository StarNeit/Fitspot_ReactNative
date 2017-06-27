import React from 'react';
import SubscriptionContainer from '@Subscription/containers/SubscriptionContainer';
import { Page, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const SubscriptionScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <PageHeaderContainer />
      <PageContent>
        <SubscriptionContainer />
      </PageContent>
    </SecurePageContainer>
  );
};

export default SubscriptionScene;
