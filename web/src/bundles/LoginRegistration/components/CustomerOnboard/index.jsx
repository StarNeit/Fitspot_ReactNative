import React from 'react';
import OnboardForm from './OnboardForm';

const CustomerOnboard = (props) => {
  const {onUpdateClick, isFetching, error} = props;
  // TODO: Nice-looking error component
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="login-area text-center">
            <p className="title-text">Tell us a bit more about yourself.</p>

            {error ? <div className="alert alert-danger">{error}</div> : null}
            <OnboardForm onSubmit={onUpdateClick} isFetching={isFetching} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOnboard;
