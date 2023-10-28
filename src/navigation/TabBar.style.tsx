import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../common/theme/colors';
import {commonTheme} from '../common/theme';

interface StylePropTypes {
  tabBarContainer: ViewStyle;
  tabItem: ViewStyle;
  tabItemContainer: ViewStyle;
  tabLabel: TextStyle;
  animatedTab: ViewStyle;
}

export const styles = StyleSheet.create<StylePropTypes>({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    padding: moderateScale(5),
    height: '10%',
    width: '100%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemContainer: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: commonTheme.fontSizes.m,
    paddingBottom: moderateScale(10),
  },
  animatedTab: {
    position: 'absolute',
    bottom: moderateScale(5),
    height: '100%',
    width: '50%',
    padding: moderateScale(5),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
  },
});
