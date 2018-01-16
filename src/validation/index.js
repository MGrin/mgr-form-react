import * as defaultValidators from './validators';
import { registerToStore } from '../utils';

export { validateFormDescription } from './descriptionValidation';

export const validators = new Map();
export const registerValidator = (name, validate) => registerToStore(validators, 'Validator', name, validate);

Object.keys(defaultValidators).forEach(validator => registerValidator(validator, defaultValidators[validator]));
