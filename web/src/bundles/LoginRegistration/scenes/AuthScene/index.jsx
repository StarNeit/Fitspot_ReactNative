import React from 'react';
import AuthContainer from '@LoginRegistration/containers/AuthContainer';
import { Page, PageContent } from '@shared/components';

const AuthScene = (props) => {
  return (
    <Page>
      <PageContent>
        <AuthContainer location={props.location} />
      </PageContent>
    </Page>
  );
};

export default AuthScene;
