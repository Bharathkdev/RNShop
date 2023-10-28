import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../common/theme/colors';
import {ImageStyle} from 'react-native-fast-image';
import {commonTheme} from '../../common/theme';

interface stylePropTypes {
  container: ViewStyle;
  title: TextStyle;
  categoryContainer: ViewStyle;
  categoryText: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  imageStyle: ImageStyle;
  footer: ViewStyle;
}

export const styles = StyleSheet.create<stylePropTypes>({
  container: {
    padding: moderateScale(16),
  },
  title: {
    fontSize: commonTheme.fontSizes.xl,
    color: colors.light,
    marginBottom: moderateScale(25),
    marginTop: moderateScale(10),
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
