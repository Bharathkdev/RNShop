import React from 'react';
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {colors} from '../theme/colors';
import {childrenTypes} from '../../types/commonTypes';

interface stylePropTypes {
  topSafeAreaStyle: ViewStyle;
  bottomSafeAreaStyle: ViewStyle;
}

const styles = StyleSheet.create<stylePropTypes>({
  topSafeAreaStyle: {
    flex: 0,
    backgroundColor: colors.primary,
  },
  bottomSafeAreaStyle: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});

export const SafeArea: React.FC<childrenTypes> = ({children}) => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <>
          <SafeAreaView style={styles.topSafeAreaStyle} />
          <SafeAreaView style={styles.bottomSafeAreaStyle}>
            {children}
          </SafeAreaView>
        </>
      ) : (
        <>
          <StatusBar barStyle={'default'} backgroundColor={colors.primary} />
          {children}
        </>
      )}
    </>
  );
};