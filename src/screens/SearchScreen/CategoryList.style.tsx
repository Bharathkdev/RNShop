import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {ImageStyle} from 'react-native-fast-image';
import {colors} from '../../common/theme/colors';
import {commonTheme} from '../../common/theme';

interface StylePropTypes {
  container: ViewStyle;
  title: TextStyle;
  categoryContainer: ViewStyle;
  categoryText: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  imageStyle: ImageStyle;
  footer: ViewStyle;
}

export const styles = StyleSheet.create<StylePropTypes>({
  container: {
    padding: moderateScale(16),
  },
  title: {
    fontSize: commonTheme.fontSizes.xl,
    color: colors.light,
    marginTop: moderateScale(-15),
    marginBottom: moderateScale(25),
  },
  categoryContainer: {
    flexBasis: '30%',
    backgroundColor: colors.transparent,
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(8),
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  categoryText: {
    fontSize: commonTheme.fontSizes.xs,
    color: colors.base,
    textAlign: 'center',
    marginBottom: moderateScale(15),
  },
  button: {
    backgroundColor: colors.light,
    borderRadius: moderateScale(10),
    padding: moderateScale(8),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.base,
    fontSize: commonTheme.fontSizes.s,
    textAlign: 'center',
  },
  imageStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    marginBottom: moderateScale(10),
  },
  footer: {
    marginBottom: '40%',
  },
});
