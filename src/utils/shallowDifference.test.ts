import { shallowDifference } from './shallowDifference';

const shallowDifferenceTest = () => {
  describe('should', () => {
    it('return { isSwag: true }', () => {
      const a = { isFoo: true, isSwag: false, isBar: false };
      const b = { isFoo: true, isSwag: true, isBar: false };
      expect(shallowDifference(a, b)).toStrictEqual({
        isSwag: true,
      });
    });

    it('return { isSwag: true, isBar: true }', () => {
      const a = { isFoo: true, isSwag: false, isBar: false };
      const b = { isFoo: true, isSwag: true, isBar: true };
      expect(shallowDifference(a, b)).toStrictEqual({
        isSwag: true,
        isBar: true,
      });
    });
  });
};

describe('Utils/shallowDifference', () => {
  shallowDifferenceTest();
});
