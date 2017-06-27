import React from 'react';


const InlineRadioButton = (props) => {
  const { label, radioValue, numButtons, input: { name, value, onChange } } = props;

  const btnWidth = Math.floor(12 / (numButtons || 3));
  const className = (radioValue == value) ? `col-xs-${btnWidth} active` : `col-xs-${btnWidth}`;

  const handleClick = (event) => {
    onChange(radioValue);
    event.preventDefault();
  };

  return (
    <a className={className} href="#" onClick={handleClick}>{label}</a>
  );
};

InlineRadioButton.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string.isRequired,
  radioValue: React.PropTypes.any,
  numButtons: React.PropTypes.number,
};

export default InlineRadioButton;
