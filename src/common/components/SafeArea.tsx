import React from 'react';
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {colors} from '../theme/colors';
import {ChildrenTypes} from '../../types/commonTypes';

interface StylePropTypes {
  topSafeAreaStyle: ViewStyle;
  bottomSafeAreaStyle: ViewStyle;
}

const styles = StyleSheet.create<StylePropTypes>({
  topSafeAreaStyle: {
    flex: 0,
    backgroundColor: colors.primary,
  },
  bottomSafeAreaStyle: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});

const SafeArea: React.FC<ChildrenTypes> = ({children}) => {
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

export default React.memo(SafeArea);
