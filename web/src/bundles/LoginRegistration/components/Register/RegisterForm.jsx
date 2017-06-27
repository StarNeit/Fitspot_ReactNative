import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';
import InlineButtonList from '@shared/components/Form/InlineButtonList';
import CONSTS from '@utils/Consts';

const GENDER_LIST = [
  {
    label: 'Male',
    value: CONSTS.GENDER.MALE,
  },
  {
    label: 'Female',
    value: CONSTS.GENDER.FEMALE,
  },
  {
    label: 'Unspecified',
    value: CONSTS.GENDER.UNSPECIFIED,
  },
];

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (values.gender === CONSTS.GENDER.UNSPECIFIED) {
    errors.gender = 'Please select a gender';
  }

  return errors;
};


const RegisterForm = (props) => {
  const { handleSubmit, isFetching, error } = props;

  // TODO: Nice looking radio component?
  return (
    <form onSubmit={handleSubmit}>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <Field name="email" label="Your email" placeholder="you@yourserver.com" type="email" component={Input} />
      <Field name="password" label="Your password" placeholder="**************" type="password" component={Input} />
      <Field name="firstName" label="First Name" type="text" component={Input} className="form-group col-xs-6 kill-left-padding" />
      <Field name="lastName" label="Last Name" type="text" component={Input} className="form-group col-xs-6 kill-right-padding" />
      <Field name="phone" label="Phone" type="phone" component={Input} />

      <Field name="gender" label="Gender" component={InlineButtonList} values={GENDER_LIST} />

      <button type="submit" className="btn btn-info btn-lg btn-block" disabled={isFetching}>Complete Form To Continue</button>
    </form>
  );
};

export default reduxForm({
  form: 'registerForm',
  initialValues: {
    'gender': CONSTS.GENDER.MALE,
  },
  validate,
})(RegisterForm);
