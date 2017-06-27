import React, { PropTypes } from 'react';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

class DateTimeInput extends React.Component {
    render() {
    const { input: {value, ...rest}, label, labelExtra, placeholder, meta, calendar, time, converter, min } = this.props;

    let className = this.props.className || "form-group";
    if (meta.touched && meta.error) {
      className += " has-error";
    }

    let inputValue = value ;
    if (inputValue) {
      if (typeof inputValue === 'string') {
          if(!moment(value).isValid()){
              inputValue = new Date(moment(moment().format('MM/DD/YYYY') + ' ' + inputValue).toString()); //create date timestamp object . Fix time disappear bug
          }else{
              inputValue = new Date(inputValue);
          }
      }
    } else {
      inputValue = null;
    }

    return (
      <div className={className}>
        <label htmlFor={rest.name}>{label}{labelExtra}</label>
        <DateTimePicker
          id={rest.name}
          value={inputValue}
          placeholder={placeholder || ''}
          calendar={calendar}
          time={time}
          min={min}
          {...rest}
        />
        {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
      </div>
    );
  }
}

export default DateTimeInput;
