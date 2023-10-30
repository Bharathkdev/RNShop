import Utility from '../src/common/Utility';

describe('Utility Functions', () => {
  it('should capitalize the first letter of a word', () => {
    const word = 'example';
    const capitalized = Utility.capitalizeFirstLetter(word);
    expect(capitalized).toBe('Example');
  });

  it('should truncate a word if it is longer than 16 characters', () => {
    const longTitle = 'This is a very long title that should be truncated';
    const truncated = Utility.truncateWord(longTitle);
    expect(truncated).toBe('This is a very l...');
  });

  it('should convert a number to a string', () => {
    const number = 42;
    const converted = Utility.convertToString(number);
    expect(converted).toBe('42');
  });

  it('should add the Euro symbol to a price', () => {
    const price = 25.28;
    const formattedPrice = Utility.addEuroSymbol(price);
    expect(formattedPrice).toBe('€ 25.28');
  });

  it('should check if a value is null', () => {
    const nullValue = null;
    const nonNullValue = 'Hello';
    const isNull1 = Utility.checkIsNull(nullValue);
    const isNull2 = Utility.checkIsNull(nonNullValue);
    expect(isNull1).toBe(true);
    expect(isNull2).toBe(false);
  });
});
