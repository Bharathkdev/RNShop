import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Label} from '../Label';
import Utility from '../../Utility';
import {styles} from './ProductCard.style';

interface cardPropTypes {
  imageUri: string;
  productName: string;
  productPrice: number;
  onPress?: () => void;
  cardStyle?: ViewStyle;
}

export const ProductCard: React.FC<cardPropTypes> = ({
  imageUri,
  productName,
  productPrice,
  onPress,
  cardStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.cardStyle, styles.cardShadowStyle, cardStyle]}>
      <FastImage
        source={{
          uri: imageUri,
          priority: FastImage.priority.high,
        }}
        style={styles.imageStyle}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.infoContainer}>
        <Label
          title={productName}
          labelStyle={styles.infoText}
          ellipsis={true}
        />
        <Label
          title={Utility.addEuroSymbol(productPrice)}
          labelStyle={styles.infoText}
        />
      </View>
    </TouchableOpacity>
  );
};
