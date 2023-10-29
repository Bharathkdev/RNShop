import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {commonTheme} from '../theme/index';
import Utility from '../Utility';

interface StylePropTypes {
  labelStyle: TextStyle;
}

const styles = StyleSheet.create<StylePropTypes>({
  labelStyle: {
    fontSize: commonTheme.fontSizes.m,
    fontFamily: commonTheme.fonts.bold,
  },
});

interface LabelPropTypes {
  title: string;
  labelStyle?: TextStyle;
  ellipsis?: boolean;
  capitalizeFirstLetter?: boolean;
}

const Label: React.FC<LabelPropTypes> = ({
  title,
  labelStyle,
  ellipsis,
  capitalizeFirstLetter,
}) => {
  let updatedTitle: string = title;

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

export default React.memo(Label);
