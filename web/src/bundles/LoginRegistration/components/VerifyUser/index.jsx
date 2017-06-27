import React from 'react';
import CodeForm from './CodeForm.jsx';


const VerifyUser = (props) => {
  const {onVerifyClick, error, onResendCodeClick, isCodeResent} = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="login-area register-area text-center">
            <p className="title-text">You should be getting a security code via SMS. Please enter it here.<br/>This helps us prevent fake accounts.</p>
            {error ? <div className="alert alert-danger">{error}</div> : null}
            {isCodeResent && !error ? <div className="text-center marginBottom20">Verification code was resent.</div> : null}
            <CodeForm onSubmit={onVerifyClick} onResendCodeClick={onResendCodeClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
