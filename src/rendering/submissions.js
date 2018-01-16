import React from 'react';
import PropTypes from 'prop-types';

import { SUBMISSION_RENDERER_PROPS } from '../props';

export const button = ({ className, data, disabled, clear, label }) => (
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

button.inputProps = {
  ...SUBMISSION_RENDERER_PROPS,
  label: PropTypes.string,
};
button.defaultProps = {
  label: 'Submit',
};