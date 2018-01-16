import * as transformations from '../transformations';

describe('transformations', () => {
  describe('trim', () => {
    test('should trim', () => {
      expect(transformations.trim('a')).toEqual('a');
      expect(transformations.trim(' a')).toEqual('a');
      expect(transformations.trim('a ')).toEqual('a');
      expect(transformations.trim(' a ')).toEqual('a');
      expect(transformations.trim('   ')).toEqual('');
    });
  });
});