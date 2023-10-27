import {StyleSheet, ViewStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import {ImageStyle} from 'react-native-fast-image';

interface stylePropTypes {
  cardStyle: ViewStyle;
  cardShadowStyle: ViewStyle;
  imageStyle: ImageStyle;
  infoContainer: ViewStyle;
  infoText: ViewStyle;
}

export const styles = StyleSheet.create<stylePropTypes>({
  cardStyle: {
    width: '46%',
    marginLeft: moderateScale(10.5),
    marginVertical: '2%',
    height: moderateScale(250),
    backgroundColor: colors.light,
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    borderColor: colors.primary,
    borderWidth: moderateScale(2),
  },
  cardShadowStyle: {
    shadowColor: colors.base,
    shadowOffset: {
      width: 0,
      height: moderateScale(1),
    },
    shadowOpacity: moderateScale(0.18),
    shadowRadius: moderateScale(1.0),
    elevation: moderateScale(1),
  },
  imageStyle: {
    width: '100%',
    height: '75%', // image takes 75% of the card height
  },
  infoContainer: {
    height: '25%', // info takes 25% of the card height
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(5),
    borderColor: colors.primary,
    borderTopWidth: moderateScale(2),
    backgroundColor: colors.dark,
  },
  infoText: {
    color: colors.base,
  },
});
