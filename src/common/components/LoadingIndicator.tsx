import React from 'react';
import {StyleSheet, View, ViewStyle, ActivityIndicator} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

interface stylePropTypes {
  viewStyle: ViewStyle;
}

const styles = StyleSheet.create<stylePropTypes>({
  viewStyle: {
    position: 'absolute',
    zIndex: moderateScale(100),
    elevation: moderateScale(100),
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface LoadingIndicatorTypes {
  loading: boolean;
  color: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorTypes> = ({
  loading,
  color,
}) => {
  if (loading) {
    return (
      <View style={styles.viewStyle}>
        <ActivityIndicator size="large" animating={loading} color={color} />
      </View>
    );
  }

  return null;
};
