import {StyleSheet, ViewStyle, TextStyle, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../common/theme/colors';
import {commonTheme} from '../../common/theme';

interface StylePropTypes {
  searchBarContainer: ViewStyle;
  searchBarInput: TextStyle;
  searchBarCloseIcon: ViewStyle;
  searchBarIcons: ViewStyle;
  resultsHeaderStyle: TextStyle;
  noResultsText: TextStyle;
  noResultsView: ViewStyle;
  listFooter: ViewStyle;
}

export const styles = StyleSheet.create<StylePropTypes>({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(5),
    backgroundColor: colors.light,
    marginTop:
      Platform.OS === 'android' ? moderateScale(20) : moderateScale(10),
    marginBottom: moderateScale(25),
    marginHorizontal:
      Platform.OS === 'android' ? moderateScale(12) : moderateScale(10),
    borderRadius: moderateScale(5),
  },
  searchBarInput: {
    flex: 1,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    fontSize: commonTheme.fontSizes.l,
    fontFamily: commonTheme.fonts.medium,
    color: colors.dark,
  },
  searchBarCloseIcon: {
    marginRight: moderateScale(5),
  },
  searchBarIcons: {
    marginLeft: moderateScale(5),
  },
  resultsHeaderStyle: {
    fontSize: commonTheme.fontSizes.xl,
    color: colors.light,
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(14),
  },
  noResultsText: {
    color: colors.base,
    fontSize: commonTheme.fontSizes.l,
  },
  noResultsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooter: {
    marginBottom: moderateScale(10),
  },
});
