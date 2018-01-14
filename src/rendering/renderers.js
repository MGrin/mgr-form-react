import React from 'react';
import PropTypes from 'prop-types';
import { FIELD_RENDERER_PROPS, SUBMISSION_RENDERER_PROPS } from '../props';

export const input = ({ value, className, fieldNameAsCss, validate, disabled, onValueChange, ...otherProps }) => (
  <input
    value={value}
    className={`${className} ${className}-renderer ${className}-${fieldNameAsCss}-renderer`}
    onChange={({ target: { value }}) => onValueChange(value)}
    onBlur={validate}
    disabled={disabled}
    {...otherProps}
    />
);
input.propTypes = FIELD_RENDERER_PROPS;

export const select = ({ value, className, fieldNameAsCss, validate, disabled, onValueChange, options, ...otherProps }) => (
  <select
    value={value}
    className={`${className} ${className}-renderer ${className}-${fieldNameAsCss}-renderer`}
    onChange={({ target: { value }}) => onValueChange(value)}
    onBlur={validate}
    disabled={disabled}
    {...otherProps}>
    {options.map((option, idx) => (
      <option
        value={option.value}
        key={`option-${fieldNameAsCss}-${idx}`}>{option.label}</option>
    ))}
  </select>
);
select.propTypes = {
  ...FIELD_RENDERER_PROPS,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
};

export const submissionButton = ({ className, data, disabled, clear, label }) => (
  <button
    className={`${className} ${className}-button`}
    disabled={disabled}
    onClick={() => {
      console.log(data);
      clear();
    }}>
    {label}
  </button>
);

submissionButton.inputProps = {
  ...SUBMISSION_RENDERER_PROPS,
  label: PropTypes.string,
};
submissionButton.defaultProps = {
  label: 'Submit',
};
