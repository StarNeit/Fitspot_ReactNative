import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input'


const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  return errors;
};

const ForgotPasswordForm = (props) => {
  const { handleSubmit, isFetching } = props;


  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" label="Your email" placeholder="you@yourserver.com" type="email" component={Input} />
      <button type="submit" className="btn btn-info btn-lg btn-block" disabled={isFetching}>Get Password Reset Token</button>
    </form>
  );
};

export default reduxForm({
  form: 'forgotPasswordForm',
  validate,
})(ForgotPasswordForm);
