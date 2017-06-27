import React from 'react';
import InlineRadioButton from '../InlineRadioButton';


const InlineButtonList = (props) => {
  const { label, labelExtra, values, meta, input } = props;

  const components = values.map(v => {
    return (
      <InlineRadioButton key={v.label} input={input} numButtons={values.length} label={v.label} radioValue={v.value} />
    );
  });

  let className = props.className || "form-group";
  if (meta.touched && meta.error) {
    className += " has-error";
  }

  return (
    <div className={className}>
      <label>{label}{labelExtra}</label>
      <div className="row inline-button-row">
        {components}
      </div>
      {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
    </div>
  );
};

// TODO: props validation

export default InlineButtonList;
