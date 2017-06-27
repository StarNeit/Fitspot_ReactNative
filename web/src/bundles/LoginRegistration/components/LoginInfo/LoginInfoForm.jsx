import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';


const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  return errors;
};


const LoginInfoForm = (props) => {
  const { handleSubmit, isFetching, error } = props;

  return (
    <form onSubmit={handleSubmit}>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <Field name="email" label="Your email" placeholder="you@yourserver.com" type="email" component={Input} />
      <Field name="firstName" label="First Name" type="text" component={Input} className="form-group col-xs-6 kill-left-padding" />
      <Field name="lastName" label="Last Name" type="text" component={Input} className="form-group col-xs-6 kill-right-padding" />
      <Field name="phone" label="Phone" type="phone" component={Input} />

      <button type="submit" className="btn btn-info btn-lg btn-block" disabled={isFetching}>Complete Form To Continue</button>
    </form>
  );
};

const form = reduxForm({
  form: 'loginInfoForm',
  validate,
})(LoginInfoForm);

const mapStateToProps = (state) => {
  return {
    initialValues: state.auth.needMoreInfoData,
  };
}

export default connect(mapStateToProps)(form);
