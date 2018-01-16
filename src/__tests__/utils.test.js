import * as utils from '../utils';

describe('General utility functions', () => {
  describe('transformToArray', () => {
    test('should return empty array if entry is null', () => {
      const res = utils.transformToArray();
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(0);
    });

    test('should return same array as was passed in arguments', () => {
      const orig = ['a', 'b', 'c'];
      const res = utils.transformToArray(orig);
      expect(res).toBe(orig);
    });

    test('should return array with one element, that was passed as argument', () => {
      const str = 'a';
      const res = utils.transformToArray(str);

      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(1);
      expect(res).toContainEqual(str);
    })
  });

  describe('validateArrays', () => {
    const store = new Map();
    const storename = 'Store';
    store.set('a', 1);
    store.set('b', 2);
    store.set('c', 3);

    test('should not throw any error if array contains values from store', () => {
      expect(() => utils.validateArrays(store, 'a', storename)).not.toThrow();
      expect(() => utils.validateArrays(store, ['a', 'b'], storename)).not.toThrow();
      expect(() => utils.validateArrays(store, ['a', 'b', 'c'], storename)).not.toThrow();
    });

    test('should throw an error if array contains values, that are missing in the store', () => {
      expect(() => utils.validateArrays(store, 'd', storename)).toThrow();
      expect(() => utils.validateArrays(store, ['c', 'd'], storename)).toThrow();
      expect(() => utils.validateArrays(store, ['d', 'e'], storename)).toThrow();
    });
  });

  describe('registerToStore', () => {
    const store = new Map();
    const storename = 'Store';
    store.set('a', () => {});

    test('should throw an error if no name provided', () => {
      expect(() => utils.registerToStore(store, storename, null, () => {})).toThrow();
    });

    test('should throw an error if no or not a function provided', () => {
      expect(() => utils.registerToStore(store, storename, 'b')).toThrow();
      expect(() => utils.registerToStore(store, storename, 'b', 'b')).toThrow();
    });

    test('should console.warn if store contains the provided name and register', () => {
      console.warn = jest.fn(() => {});
      const newFunc = jest.fn(() => {});

      expect(store.get('a')).toBeDefined();
      store.get('a')();
      expect(newFunc).not.toHaveBeenCalled();

      expect(() => utils.registerToStore(store, storename, 'a', newFunc)).not.toThrow();
      expect(console.warn).toHaveBeenCalled();
      expect(store.get('a')).toBeDefined();

      store.get('a')();
      expect(newFunc).toHaveBeenCalled();
    });

    test('should register a function in a store', () => {
      const newFunc = jest.fn(() => {});

      expect(store.get('d')).not.toBeDefined();
      expect(() => utils.registerToStore(store, storename, 'd', newFunc)).not.toThrow();
      expect(store.get('d')).toBeDefined();

      store.get('d')();
      expect(newFunc).toHaveBeenCalled();
    });
  });

  describe('compose', () => {
    const val = 1;
    const store = new Map();
    store.set('a', v => v*2);
    store.set('b', v => v + 5);

    test('should not modify a value if no functions are provided', () => {
      expect(utils.compose(store)()(val)).toBe(val);
    });

    test('should apply functions in the right order', () => {
      expect(utils.compose(store)(['a', 'b'])(val)).toBe(7);
      expect(utils.compose(store)(['b', 'a'])(val)).toBe(12);
    });
  });
});