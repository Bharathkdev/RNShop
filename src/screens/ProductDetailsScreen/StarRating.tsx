import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../common/theme/colors';

interface StylePropTypes {
  container: ViewStyle;
}

const styles = StyleSheet.create<StylePropTypes>({
  container: {
    flexDirection: 'row',
  },
});

interface StarRatingPropTypes {
  rating: number;
}

const StarRating: React.FC<StarRatingPropTypes> = ({rating}) => {
  // Calculate the number of full stars and check for a half star
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 2 !== 0;

  const renderIcon = (key: string, iconName: string) => {
    return (
      <Ionicons
        key={key}
        name={iconName}
        size={moderateScale(15)}
        color={colors.base}
      />
    );
  };

  // Function to render individual stars
  const renderStar = (index: number) => {
    const key = `star-${index}`;
    if (index < fullStars) {
      return renderIcon(key, 'star');
    } else if (hasHalfStar && index === fullStars) {
      return renderIcon(key, 'star-half');
    } else {
      return renderIcon(key, 'star-outline');
    }
  };

  return (
    <View style={styles.container}>
      {Array(5)
        .fill(null)
        .map((_: any, index: number) => renderStar(index))}
    </View>
  );
};

export default StarRating;
