import {moderateScale} from 'react-native-size-matters';

type FontSizeName =
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xl20'
  | 'xl22'
  | 'xxl'
  | 'xxxl'
  | 'xxxl34'
  | 'xxxxl'
  | 'xl5';

// Record<K, T>: Useful when you want to create a dictionary or map-like type of same data type.
type FontSizes = Record<FontSizeName, number>;

type FontName = 'light' | 'regular' | 'medium' | 'bold';

type Fonts = Record<FontName, string>;

interface CommonThemeTypes {
  fonts: Fonts;
  fontSizes: FontSizes;
}

export const commonTheme: CommonThemeTypes = {
  fonts: {
    light: 'Nunito-Light',
    regular: 'Nunito-Regular',
    medium: 'Nunito-Medium',
    bold: 'Nunito-Bold',
  },
  fontSizes: {
    xs: moderateScale(11),
    s: moderateScale(12),
    m: moderateScale(14),
    l: moderateScale(16),
    xl: moderateScale(18),
    xl20: moderateScale(20),
    xl22: moderateScale(22),
    xxl: moderateScale(24),
    xxxl: moderateScale(30),
    xxxl34: moderateScale(34),
    xxxxl: moderateScale(40),
    xl5: moderateScale(50),
  },
};
