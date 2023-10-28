import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../common/theme/colors';
import {commonTheme} from '../../common/theme';

interface StylePropTypes {
  container: ViewStyle;
  logoImageStyle: ImageStyle;
  logoStyle: ViewStyle;
  discountIconContainer: ViewStyle;
  discountBanner: ViewStyle;
  discountText: TextStyle;
  fireEmoji: TextStyle;
  listFooter: TextStyle;
  loadingIndicator: ViewStyle;
}

export const styles = StyleSheet.create<StylePropTypes>({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoImageStyle: {
    width: '100%',
    height: '100%',
  },
  logoStyle: {
    width: moderateScale(150),
    height: moderateScale(50),
    backgroundColor: colors.transparent,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(15),
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: moderateScale(7),
    },
    shadowOpacity: moderateScale(0.3),
    shadowRadius: moderateScale(9.11),
    elevation: moderateScale(14),
  },
  discountIconContainer: {
    backgroundColor: colors.base,
    padding: moderateScale(13),
    borderTopRightRadius: moderateScale(25),
  },
  discountBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    overflow: 'hidden',
    backgroundColor: colors.baseLight,
    marginHorizontal: moderateScale(10),
  },
  discountText: {
    flex: 1,
    textAlign: 'center',
    color: colors.dark,
  },
  fireEmoji: {
    fontSize: commonTheme.fontSizes.xl20,
  },
  listFooter: {
    color: colors.base,
    textAlign: 'center',
    marginVertical: moderateScale(10),
  },
  loadingIndicator: {
    marginVertical: moderateScale(30),
  },
});
