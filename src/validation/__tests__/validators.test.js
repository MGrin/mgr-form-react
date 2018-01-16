import * as validators from '../validators';

describe('validators', () => {
  test('numbers', () => {
    expect(validators.numbers(123)).toBeNull();
    expect(validators.numbers('123')).toBeNull();
    expect(validators.numbers(' 123 ')).not.toBeNull();
    expect(validators.numbers('')).toBeNull();
  });

  test('required', () => {
    expect(validators.required('')).not.toBeNull();
    expect(validators.required(null)).not.toBeNull();
    expect(validators.required('123')).toBeNull();
  });

  test('email', () => {
    expect(validators.email('')).toBeNull();
    expect(validators.email('test@test.test')).toBeNull();
    expect(validators.email('asdasdsad')).not.toBeNull();
  });
});