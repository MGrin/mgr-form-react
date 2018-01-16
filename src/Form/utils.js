import { validators as validatorsStore } from '../validation';
import { transformToArray } from '../utils';

export const constructStateFromDescription = ({ fields }) => {
  const values = fields.reduce((acc, field) => ({
    ...acc,
    [field.name]: field.defaultValue || '',
  }), {});

  const errors = fields.reduce((acc, field) => ({
    ...acc,
    ...validateField(field.name, field.validators)(values[field.name]),
  }), {});

  const disabled = fields.reduce((acc, field) => ({
    ...acc,
    [field.name]: field.disable ? field.disable(values, errors) : false,
  }), {});

  const hidden = fields.reduce((acc, field) => ({
    ...acc,
    [field.name]: field.hide ? field.hide(values, errors) : false,
  }), {});

  return {
    values,
    errors,
    disabled,
    hidden,
  };
};

export const validateField = (fieldName, validatorsRaw = [], store = validatorsStore) => (value) => {
  const validators = transformToArray(validatorsRaw).map(valStr => store.get(valStr));

  let errors = [];

  for (let i = 0; i < validators.length; i++) {
    const err = validators[i](value);
    if (err) errors.push(err);
  }

  return {
    [fieldName]: errors.length > 0 ? errors : null,
  };
};

export const changeStatus = (statusName, { values, errors }, successCb = () => {}) => (field) => {
  if (!field[statusName]) return false;

  const res = field[statusName](values, errors);
  if (res) successCb(field);

  return res; 
};

export const updateStateAfterValidation = (state, { fields }) => {
  let valuesUpdate = {};
  let errorsUpdate = {};

  const isDisabled = changeStatus('disable', state, (field) => {
    errorsUpdate[field.name] = null;
  });
  const isHidden = changeStatus('hide', state, (field) => {
    errorsUpdate[field.name] = null;
    valuesUpdate[field.name] = '';
  });

  const disabledUpdate = fields.reduce((acc, field) => ({
    ...acc,
    [field.name]: isDisabled(field),
  }), {});

  const hiddenUpdate = fields.reduce((acc, field) => ({
    ...acc,
    [field.name]: isHidden(field),
  }), {});

  return {
    values: valuesUpdate,
    errors: errorsUpdate,
    disabled: disabledUpdate,
    hidden: hiddenUpdate,
  };
};

export const isFormValid = (errors) => Object
    .keys(errors)
    .reduce((acc, field) => !(errors[field]) && acc, true);

export const getSubmissionProps = (submission) => {
  const submissionProps = { ...submission };
  delete submissionProps.renderer;

  return submissionProps;
}

export const cleanFieldProps = (props) => {
  const fieldProps = { ...props };

  delete fieldProps.name;
  delete fieldProps.label;
  delete fieldProps.renderer;
  delete fieldProps.transformations;
  delete fieldProps.validators;
  delete fieldProps.defaultValue;
  delete fieldProps.disable;
  delete fieldProps.hide;

  return fieldProps;
}