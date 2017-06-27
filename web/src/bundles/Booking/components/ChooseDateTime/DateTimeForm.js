import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DateTimeInput from '@shared/components/Form/DateTimeInput';
import moment from 'moment';

const validate = (values) => {
  const errors = {};

  if (!values.day) {
    errors.day = 'Day Required';
  }
  if (!values.time) {
    errors.time = 'Time Required';
  }

  return errors;
};

let DateTimeForm = (props) => {
  const { handleSubmit, title} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="day" label="Day" component={DateTimeInput} calendar time={false} min={new Date()}/>
      <Field name="time" label="Time" component={DateTimeInput} time calendar={false}/>
      <button type="submit" className="btn btn-info btn-lg btn-block">{title ? title: 'Continue'}</button>
    </form>
  );
};

DateTimeForm = reduxForm({
  form: 'dateTimeForm',
  destroyOnUnmount: false,
  enableReinitialize : true,
  //Initial data for fields
  initialValues: {
    day: moment().format('MM/DD/YYYY'),
    time: moment().add(1, 'hours').add(30, 'minutes').toString()
  },
  validate
})(DateTimeForm);

export default DateTimeForm;
