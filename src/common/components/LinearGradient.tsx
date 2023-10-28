import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../theme/colors';
import {ChildrenTypes} from '../../types/commonTypes';

interface StylePropTypes {
  container: ViewStyle;
}

const styles = StyleSheet.create<StylePropTypes>({
  container: {
    flex: 1,
  },
});

export const Gradient: React.FC<ChildrenTypes> = ({children}) => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.dark]}
      style={styles.container}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      {children}
    </LinearGradient>
  );
};
