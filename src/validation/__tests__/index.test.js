import * as entry from '../index';
import * as defaultValidators from '../validators';

describe('validation package', () => {
  test('should export exactly what it should export',  () => {
    expect(Object.keys(entry)).toEqual(['validateFormDescription', 'validators', 'registerValidator']);
  });

  test('should already have all default validations registered', () => {
    const keys = Array.from(entry.validators.keys());
    const defaults = Object.keys(defaultValidators);

    expect(keys).toHaveLength(defaults.length);
    defaults.forEach(valid => expect(keys).toContainEqual(valid));
  });

  test('should register new validation', () => {
    const fn = () => {};
    entry.registerValidator('test', fn);
    expect(entry.validators.get('test')).toBe(fn);
  });
});
