import React from 'react';
import LoginInfoForm from './LoginInfoForm';


const LoginInfo = (props) => {
  const {onSubmit, error} = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="login-area register-area text-center">
            <p className="title-text">Please confirm your profile information to continue</p>
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <LoginInfoForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInfo;
