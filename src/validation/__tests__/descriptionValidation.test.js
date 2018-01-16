import {
  validateFields,
  validateSubmission,
  validateFormDescription,
} from '../descriptionValidation';

describe('Description validation', () => {
  describe('Submission part validation', () => {
    test('submission should have renderer string that is known to the lib', () => {
      expect(() => validateSubmission({})).toThrow();
      expect(() => validateSubmission({ renderer: 'blablabla' })).toThrow();
      expect(() => validateSubmission({ renderer: 'button' })).not.toThrow();
    });
  });

  describe('Fields part validation', () => {
    test('fields should be an array', () => {
      expect(() => validateFields({})).toThrow();
      expect(() => validateFields()).toThrow();
      expect(() => validateFields('a')).toThrow();
      expect(() => validateFields([])).not.toThrow();
    });

    test('fields array should not contain undefined or null values', () => {
      expect(() => validateFields([null])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input' }, null])).toThrow();
    });

    test('field object must contain name key', () => {
      expect(() => validateFields([{ renderer: 'input' }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input' }])).not.toThrow();
    });

    test('field object must contain render key', () => {
      expect(() => validateFields([{ name: 'field' }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input' }])).not.toThrow();
    });

    test('field objects should have unique names', () => {
      expect(() => validateFields([{ name: 'field', renderer: 'input' }, { name: 'field', renderer: 'input' }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input' }, { name: 'field2', renderer: 'input' }])).not.toThrow();
    });
    
    test('field object should declare a registered renderer', () => {
      expect(() => validateFields([{ name: 'field', renderer: 'input' }])).not.toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'not a valid renderer' }])).toThrow();
    });

    test('field object should have a registered validator(s)', () => {
      expect(() => validateFields([{ name: 'field', renderer: 'input', validators: 'unknown validator' }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input', validators: ['unknown validator1', 'unknown validator2'] }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input', validators: ['unknown validator1', 'required'] }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input', validators: ['required'] }])).not.toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input', validators: 'required' }])).not.toThrow();
    });

    test('field object should have a registered transformation(s)', () => {
      expect(() => validateFields([{ name: 'field', renderer: 'input', transformations: 'unknown transformation' }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input', transformations: ['unknown transformation1', 'unknown transformation2'] }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input', transformations: ['unknown transformation1', 'trim'] }])).toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input', transformations: ['trim'] }])).not.toThrow();
      expect(() => validateFields([{ name: 'field', renderer: 'input', transformations: 'trim' }])).not.toThrow();
    });
  });

  describe('Description validation', () => {
    test('description object should have fields and submission keys', () => {
      expect(() => validateFormDescription({})).toThrow();
      expect(() => validateFormDescription({ fields: [{ name: 'test', renderer: 'input' }] })).toThrow();
      expect(() => validateFormDescription({ submission: { renderer: 'button' }})).toThrow();
      expect(() => validateFormDescription({ fields: [{ name: 'test', renderer: 'input' }], submission: { renderer: 'button' } })).not.toThrow();
    });
  });
});