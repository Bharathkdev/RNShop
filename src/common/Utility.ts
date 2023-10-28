import {isNull} from 'lodash';

const capitalizeFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

const truncateWord = (title: string): string =>
  title.length > 18 ? title.substring(0, 18) + '...' : title;

const convertToString = (value: number): string => value.toString();

const addEuroSymbol = (price: number): string => `€ ${price}`;

const checkIsNull = (value: string | null): boolean => isNull(value);

const getItemLayout = (itemHeight: number) => (_: any, index: number) => ({
  length: itemHeight,
  offset: itemHeight * index,
  index,
});

export default {
  capitalizeFirstLetter,
  truncateWord,
  convertToString,
  addEuroSymbol,
  checkIsNull,
  getItemLayout,
};
