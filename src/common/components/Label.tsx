import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {commonTheme} from '../theme/index';
import Utility from '../Utility';

interface stylePropTypes {
  labelStyle: TextStyle;
}

const styles = StyleSheet.create<stylePropTypes>({
  labelStyle: {
    fontSize: commonTheme.fontSizes.m,
    fontFamily: commonTheme.fonts.bold,
  },
});

interface labelPropTypes {
  title: string;
  labelStyle?: TextStyle;
  ellipsis?: boolean;
  capitalizeFirstLetter?: boolean;
}

export const Label: React.FC<labelPropTypes> = ({
  title,
  labelStyle,
  ellipsis,
  capitalizeFirstLetter,
}) => {
  let updatedTitle = title;

  //Check if first letter of the text need to be capitalized
  if (capitalizeFirstLetter) {
    updatedTitle = Utility.capitalizeFirstLetter(updatedTitle);
  }

  //Check if text needs to be truncated
  if (ellipsis) {
    updatedTitle = Utility.truncateWord(updatedTitle);
  }

  return <Text style={[styles.labelStyle, labelStyle]}>{updatedTitle}</Text>;
};
