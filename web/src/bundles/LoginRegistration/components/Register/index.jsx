import React from 'react';
import RegisterForm from './RegisterForm';

const Register = (props) => {
  const {onRegisterSubmit, isFetching, error, onFacebookLoginClick} = props;

  // TODO: Nice-looking error component
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="login-area register-area text-center">
            <h2>Welcome to Fitspot!</h2>
            <p>Fill in your details below.</p>
            <a href="#" className="btn btn-primary btn-lg btn-block btn-fb" onClick={onFacebookLoginClick}>Log In With Facebook</a>
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <RegisterForm onSubmit={onRegisterSubmit} isFetching={isFetching} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
