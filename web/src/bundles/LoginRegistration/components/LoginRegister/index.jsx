import React from 'react';
import LoginForm from './LoginForm';

const LoginRegister = (props) => {
  const {onLoginSubmit, onFacebookLoginClick, onRegisterClick, onForgotPasswordClick, isFetching, error} = props;
  // TODO: Nice-looking error component
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="login-area text-center">
            <h2>Welcome Back!</h2>
            <p>Fill in your details below.</p>
            <a href="#" className="btn btn-primary btn-lg btn-block btn-fb" onClick={onFacebookLoginClick}>Log In With Facebook</a>

            <p className="devider-text">OR</p>

            {error ? <div className="alert alert-danger">{error}</div> : null}
            <LoginForm onSubmit={onLoginSubmit} isFetching={isFetching} onForgotPasswordClick={onForgotPasswordClick}/>

            <p className="devider-text">NEW TO FITSPOT?</p>

            <a href="#" onClick={onRegisterClick} className="btn btn-info btn-lg btn-block">Create Your Account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
