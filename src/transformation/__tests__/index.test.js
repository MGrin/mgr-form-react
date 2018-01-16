import * as entry from '../index';
import * as defaultTransformations from '../transformations';

describe('transformation package', () => {
  test('should export exactly what it should export',  () => {
    expect(Object.keys(entry)).toEqual(['transformations', 'registerTransformation']);
  });

  test('should already have all default transformations registered', () => {
    const keys = Array.from(entry.transformations.keys());
    const defaults = Object.keys(defaultTransformations);

    expect(keys).toHaveLength(defaults.length);
    defaults.forEach(trans => expect(keys).toContainEqual(trans));
  });

  test('should register new transformation', () => {
    const fn = () => {};
    entry.registerTransformation('test', fn);
    expect(entry.transformations.get('test')).toBe(fn);
  });
});
