import { validateArrays } from '../utils';
import { renderers } from '../rendering/';

const requiredFieldKeys = ['name', 'renderer'];

export const validateFields = ({ validators, transformations, renderers}) => (fields) => {
  if (!(fields instanceof Array)) throw new Error(`Key fields should contain an array`);

  const names = {};
  
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (!field) throw new Error(`Field on index ${i} should not be null`);

    for (let j = 0; j < requiredFieldKeys.length; j++) {
      const k = requiredFieldKeys[i];
      if (!field[k]) throw new Error(`Field on index ${i} should have "${k}" property`);
    }

    if (names[field.name]) throw new Error(`Field on index ${i} has a name that was used before. Please put unique names on fields`);
    names[field.name] = true;
    
    if (!renderers.has(field['renderer'])) throw new Error(`Field on index ${i} requires unknown renderer ${field.renderer}. Did you registered it?`);
    
    if (field['validators']) {
      validateArrays(validators, field['validators'], 'validators');
    }

    if (field['transformations']) {
      validateArrays(transformations, field['transformations'], 'transformations');
    }
  }
};

export const validateSubmission = (submission) => {
  if (!submission['renderer']) throw new Error('Please provide renderer for submission');
  if (!renderers.has(submission['renderer'])) throw new Error(`Submission has unknow renderer ${submission['renderer']}. Did you register it?`);
};
