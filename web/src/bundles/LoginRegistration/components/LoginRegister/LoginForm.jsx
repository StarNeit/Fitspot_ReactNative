import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input'


const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

const LoginForm = (props) => {
  const { handleSubmit, isFetching, onForgotPasswordClick } = props;

  const labelExtra = (
    <span><a href="#" onClick={onForgotPasswordClick}>Forgot Password?</a></span>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" label="Your email" placeholder="you@yourserver.com" type="email" component={Input} />
      <Field name="password" label="Your Password" labelExtra={labelExtra} placeholder="**************" type="password" component={Input} />
      <button type="submit" className="btn btn-info btn-lg btn-block" disabled={isFetching}>Complete Form To Log In With Email</button>
    </form>
  );
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);
