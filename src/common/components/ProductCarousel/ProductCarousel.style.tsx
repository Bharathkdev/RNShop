import {StyleSheet, ViewStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import {ImageStyle} from 'react-native-fast-image';

interface stylePropTypes {
  container: ViewStyle;
  carouselView: ViewStyle;
  imageStyle: ImageStyle;
  paginationContainerStyle: ViewStyle;
  paginationDotStyle: ViewStyle;
}

export const styles = StyleSheet.create<stylePropTypes>({
  container: {
    paddingVertical: moderateScale(20),
  },
  carouselView: {
    justifyContent: 'center',
    backgroundColor: colors.light,
  },
  imageStyle: {
    width: '100%',
  },
  paginationContainerStyle: {
    paddingTop: moderateScale(10),
    paddingBottom: 0,
    backgroundColor: colors.transparent,
  },
  paginationDotStyle: {
    backgroundColor: colors.base,
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(7) / 2,
  },
});
