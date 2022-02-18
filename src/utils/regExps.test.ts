import { latinAndNumbersWithOrNotSeparatedBySpaceRegExp } from './regExps';

const latinAndNumbersWithOrNotSeparatedBySpaceRegExpTest = () => {
  describe('latinAndNumbersWithOrNotSeparatedBySpace should', () => {
    it('fail if more than 2 spaces as delimiter', () => {
      expect('dA2bc     dA2bc 2454'.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).toBeNull();
    });

    it('fail if starts with white space', () => {
      const mocks = [
        ' 4234',
        ' c adsa asd a',
        ' ',
      ];
      mocks.forEach((testStr) => {
        expect(testStr.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).toBeNull();
      });
    });

    it('fail if str.length = 0', () => {
      expect(''.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).toBeNull();
    });

    it('pass if latin and numbers without special chars', () => {
      const latin = 'abcdefghijklmnopqrstuvwxyz';
      expect(latin.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).not.toBeNull();

      const numbers = '1234567890';
      expect(numbers.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).not.toBeNull();

      const latinAndNumbersMock = latin.concat(numbers);
      expect(latinAndNumbersMock.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).not.toBeNull();
      expect(
        latinAndNumbersMock
          .toUpperCase()
          .match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp),
      ).not.toBeNull();

      expect(latin.concat('$#@~! =').match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).toBeNull();
    });

    it('pass if starts with numbers', () => {
      const mocks = [
        '1',
        '11',
        '21321 434',
        '1a',
        '1A',
      ];
      mocks.forEach((testStr) => {
        expect(testStr.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).not.toBeNull();
      });
    });

    it('pass if other cases', () => {
      const mocks = [
        'a',
        'ab',
        'a1',
        'A',
        'ABdsfsdf',
        'dsfds dfdsf 2454',
        'dsfds dfdsf 2454 a',
        'a b c d e f',
      ];
      mocks.forEach((testStr) => {
        expect(testStr.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).not.toBeNull();
      });

      expect('a b c d e f '.match(latinAndNumbersWithOrNotSeparatedBySpaceRegExp)).toBeNull();
    });
  });
};

describe('Utils/regExps', () => {
  latinAndNumbersWithOrNotSeparatedBySpaceRegExpTest();
});
