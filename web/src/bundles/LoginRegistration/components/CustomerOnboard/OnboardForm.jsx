import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';
import InlineButtonList from '@shared/components/Form/InlineButtonList';
import DateTimeInput from '@shared/components/Form/DateTimeInput';
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

  if (!values.birthday) {
    errors.birthday = 'Required';
  }

  if (!values.height) {
    errors.height = 'Required';
  }

  if (!values.weight) {
    errors.weight = 'Required';
  }

  return errors;
}

const OnboardForm = (props) => {
  const { handleSubmit } = props;

  // TODO: Medical history?
  return (
    <form onSubmit={handleSubmit}>
      <Field name="birthday" label="Your Birth Date" component={DateTimeInput} time={false} />
      <Field name="height" label="Your Height" type="input" component={Input} />
      <Field name="weight" label="Your Weight" type="input" component={Input} />
      <Field name="preferredTrainerGender" label="Do you prefer a trainer gender?" component={InlineButtonList} values={GENDER_LIST} />
      <button type="submit" className="btn btn-info btn-lg btn-block">Fill in the Form To Continue</button>
    </form>
  );
}

export default reduxForm({
  form: 'customerOnboardForm',
  validate,
})(OnboardForm);
