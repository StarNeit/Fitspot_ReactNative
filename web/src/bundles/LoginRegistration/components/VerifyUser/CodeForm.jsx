import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input'


const validate = (values) => {
  const errors = {};

  if (!values.code) {
    errors.code = 'Please enter the code.';
  }

  return errors;
}

const CodeForm = (props) => {
  const { handleSubmit, error, onResendCodeClick } = props;
  const labelExtra = (
    <span><a href="#" onClick={onResendCodeClick}>Resend Code</a></span>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Field name="code" labelExtra={labelExtra} type="input" component={Input} />
      <button type="submit" className="btn btn-info btn-lg btn-block">Enter the Code to Continue</button>
    </form>
  );
}

export default reduxForm({
  form: 'verifyUserCodeForm',
  validate,
})(CodeForm);
