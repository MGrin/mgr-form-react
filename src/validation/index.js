import { validateFields, validateSubmission } from './descriptionValidation';
import * as defaultValidators from './validators';

const requiredTopKeys = ['fields', 'submission'];
export const validateFormDescription = (form) => {
  for (let i = 0; i < requiredTopKeys.length; i++) {
    const k = requiredTopKeys[i];
    if (!form[k]) throw new Error(`Please provide ${k} property for the form`);
  }

  validateFields(form.fields);
  validateSubmission(form.submission);
};

export const validators = new Map();
export const registerValidator = (name, validate) => {
  if (!name) throw new Error('Provide a validator name');
  if (!validate) throw new Error('Provide a validator function');
  if (typeof(validate) !== 'function') throw new Error('validator should be a function');
  if (validators.has(name)) console.warn(`validator called ${name} is already registered and will be overrided`);

  validators.set(name, validate);
};

Object.keys(defaultValidators).forEach(validator => registerValidator(validator, defaultValidators[validator]));
