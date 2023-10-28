import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StarRating from './StarRating';
import {colors} from '../../common/theme/colors';
import {Label} from '../../common/components/Label';
import {strings} from '../../common/strings';
import {Gradient} from '../../common/components/LinearGradient';
import {ProductCarousel} from '../../common/components/ProductCarousel/ProductCarousel';
import Utility from '../../common/Utility';
import {styles} from './ProductDetailsScreen.style';
import {NavigationTypes, RouteTypes} from '../../types/commonTypes';
import {commonTheme} from '../../common/theme';

interface InfoRowTypes {
  value: string;
  label: string;
}

// InfoRow component displays a row with a label and value
const InfoRow: React.FC<InfoRowTypes> = ({value, label}) => {
  return (
    <View style={styles.infoInnerContainer}>
      <Label title={label} labelStyle={styles.infoRow} />
      <Label
        title={value}
        labelStyle={{
          ...styles.infoRow,
          color: colors.light,
          fontSize: commonTheme.fontSizes.m,
        }}
        capitalizeFirstLetter={true}
      />
    </View>
  );
};

const ProductDetailsScreen: React.FC<NavigationTypes & RouteTypes> = ({
  route: {params},
  navigation,
}) => {
  const {images, title, price, description, rating, category, brand, stock} =
    params;

  return (
    <Gradient>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={moderateScale(30)}
          color={colors.base}
        />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.titleContainer}>
          <Label
            title={category}
            labelStyle={styles.category}
            capitalizeFirstLetter={true}
          />
          <Label title={title} labelStyle={styles.title} />
          <View style={styles.ratingContainer}>
            <StarRating rating={parseFloat(rating.toFixed(1))} />
            <Label
              title={` (${rating.toFixed(1)})`}
              labelStyle={styles.ratings}
            />
          </View>
        </View>

        {/* Display product images in a carousel */}
        <ProductCarousel
          carouselImages={images}
          resizeMode="contain"
          isDetailsScreen={true}
        />

        <View style={styles.infoRowContainer}>
          {/* Use InfoRow component for consistent layout of product information */}
          <InfoRow
            value={Utility.addEuroSymbol(price)}
            label={strings.ProductDetailsScreen.price}
          />
          <InfoRow value={brand} label={strings.ProductDetailsScreen.brand} />
          <InfoRow
            value={Utility.convertToString(stock)}
            label={strings.ProductDetailsScreen.stock}
          />
        </View>

        <View style={styles.productDescriptionContainer}>
          <Label
            title={description}
            labelStyle={styles.productDescriptionText}
            capitalizeFirstLetter={true}
          />
        </View>
      </ScrollView>
    </Gradient>
  );
};

export default ProductDetailsScreen;
