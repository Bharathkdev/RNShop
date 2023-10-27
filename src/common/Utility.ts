import {isNull} from 'lodash';

const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const truncateWord = (title: string): string => {
  return title.length > 18 ? title.substring(0, 18) + '...' : title;
};

const convertToString = (value: number): string => {
  return value.toString();
};

const addEuroSymbol = (price: number): string => {
  return `€ ${price}`;
};

const checkIsNull = (value: string | null): boolean => {
  return isNull(value);
};

export default {
  capitalizeFirstLetter,
  truncateWord,
  convertToString,
  addEuroSymbol,
  checkIsNull,
};
