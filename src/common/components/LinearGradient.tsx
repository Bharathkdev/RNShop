import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../theme/colors';
import {StyleSheet, ViewStyle} from 'react-native';
import {childrenTypes} from '../../types/commonTypes';

interface stylePropTypes {
  container: ViewStyle;
}

const styles = StyleSheet.create<stylePropTypes>({
  container: {
    flex: 1,
  },
});

export const Gradient: React.FC<childrenTypes> = ({children}) => {
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
