import React from 'react';
import LaunchContainer from '@Launch/containers/LaunchContainer';
import { Page, PageContent } from '@shared/components';
import { SecurePageContainer, PageHeaderContainer } from '@shared/containers';

const LaunchScene = (props) => {
  return (
    <SecurePageContainer location={props.location}>
      <PageHeaderContainer />
      <PageContent>
        <LaunchContainer />
      </PageContent>
    </SecurePageContainer>
  );
};

export default LaunchScene;
