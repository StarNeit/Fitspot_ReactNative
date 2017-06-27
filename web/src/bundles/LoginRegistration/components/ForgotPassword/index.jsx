import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = (props) => {
  const {onForgotSubmit, isFetching, isEmailSent, error} = props;
  // TODO: Nice-looking error component
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="login-area text-center">
            <h2>Restore Password With Email</h2>
            {isEmailSent ? <div className="text-center marginBottom20">Email with instructions was sent.</div> : null}
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <ForgotPasswordForm onSubmit={onForgotSubmit} isFetching={isFetching} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
