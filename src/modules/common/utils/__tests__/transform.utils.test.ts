import { flatten } from '../transform.utils';

describe('TransformUtils', () => {
  describe('Flatten', () => {
    it('Should flatten object', () => {
      expect(flatten({ a: { b: 'value' } })).toEqual({ 'a.b': 'value' });
    });
  });
});
