import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../common/theme/colors';
import {commonTheme} from '../../common/theme';

interface StylePropTypes {
  title: TextStyle;
  ratings: TextStyle;
  category: TextStyle;
  ratingContainer: ViewStyle;
  infoRowContainer: ViewStyle;
  infoInnerContainer: ViewStyle;
  infoRow: TextStyle;
  productDescriptionContainer: ViewStyle;
  productDescriptionText: TextStyle;
  titleContainer: ViewStyle;
  backButtonContainer: ViewStyle;
}

export const styles = StyleSheet.create<StylePropTypes>({
  title: {
    color: colors.light,
    paddingBottom: moderateScale(10),
    fontSize: commonTheme.fontSizes.xl20,
  },
  category: {
    color: colors.light,
    paddingBottom: moderateScale(10),
    fontSize: commonTheme.fontSizes.m,
  },
  ratings: {
    color: colors.light,
    fontSize: commonTheme.fontSizes.s,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  infoRowContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
  },
  infoInnerContainer: {
    flex: 1,
  },
  infoRow: {
    fontSize: commonTheme.fontSizes.l,
    textAlign: 'center',
    paddingTop: moderateScale(5),
    color: colors.base,
  },
  productDescriptionContainer: {
    paddingVertical: moderateScale(30),
    paddingHorizontal: moderateScale(20),
  },
  productDescriptionText: {
    fontSize: commonTheme.fontSizes.l,
    color: colors.light,
  },
  titleContainer: {
    marginHorizontal: moderateScale(20),
    paddingTop: moderateScale(5),
  },
  backButtonContainer: {
    padding: moderateScale(10),
  },
});
