import React from 'react';
import PropTypes from 'prop-types';

const Field = ({ name, label, value, error, disabled, hidden, className, render, validate, onValueChange, ...fieldRendererProps }) => {
  const fieldNameAsCss = name.replace(/\s/g, '');
  const Input = render;

  return (
    <div className={`${className} ${className}-wrapper ${className}-${fieldNameAsCss}-wrapper ${hidden ? 'hidden' : ''}`}>
      <label className={`${className} ${className}-label ${className}-${fieldNameAsCss}-label`}>{label}</label>
      <div className={`${className}-renderer-wrapper ${className}-${fieldNameAsCss}-renderer-wrapper`}>
        <Input
          value={value}
          validate={validate}
          disabled={disabled}
          onValueChange={onValueChange}
          className={className}
          fieldNameAsCss={fieldNameAsCss}
          {...fieldRendererProps} />
      </div>
      <label className={`${className} ${className}-error-label ${className}-${fieldNameAsCss}-error-label ${!error ? 'hidden' : ''}`}>{error || ''}</label>
    </div>
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  className: PropTypes.string,
  render: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default Field;