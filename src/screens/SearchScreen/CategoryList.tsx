/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useMemo} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {ProductSliceStateTypes} from '../../types/commonTypes';
import Label from '../../common/components/Label';
import {strings} from '../../common/strings';
import {fetchCategoriesListAction} from '../../store/actions';
import Utility from '../../common/Utility';
import {styles} from './CategoryList.style';

// Defined a mapping of category names to their associated local images.
const categoryImages = {
  'smartphones': require('../../../assets/images/smartphones.png'),
  'laptops': require('../../../assets/images/laptops.png'),
  'fragrances': require('../../../assets/images/fragrances.png'),
  'skincare': require('../../../assets/images/skincare.png'),
  'groceries': require('../../../assets/images/groceries.png'),
  'home-decoration': require('../../../assets/images/home-decoration.png'),
  'furniture': require('../../../assets/images/furniture.png'),
  'tops': require('../../../assets/images/tops.png'),
  'womens-dresses': require('../../../assets/images/womens-dresses.png'),
  'womens-shoes': require('../../../assets/images/womens-shoes.png'),
  'mens-shirts': require('../../../assets/images/mens-shirts.png'),
  'mens-shoes': require('../../../assets/images/mens-shoes.png'),
  'mens-watches': require('../../../assets/images/mens-watches.png'),
  'womens-watches': require('../../../assets/images/womens-watches.png'),
  'womens-bags': require('../../../assets/images/womens-bags.png'),
  'womens-jewellery': require('../../../assets/images/womens-jewellery.png'),
  'sunglasses': require('../../../assets/images/sunglasses.png'),
  'automotive': require('../../../assets/images/automotive.png'),
  'motorcycle': require('../../../assets/images/motorcycle.png'),
  'lighting': require('../../../assets/images/lighting.png'),
};

/**
 * Define a type 'CategoryImageKeys' that represents the valid keys that can be
  used to index the 'categoryImages' object.
*/
type CategoryImageKeys = keyof typeof categoryImages;

interface CategoryListPropTypes {
  onSelectCategory: (category: CategoryImageKeys) => void;
}

export const CategoryList: React.FC<CategoryListPropTypes> = ({onSelectCategory}) => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  // Retrieve Categories List from the Redux store
  const categories = useSelector(
    (state: {product: ProductSliceStateTypes}) => state.product?.categories,
  );
  const dispatch = useDispatch();

  // Fetch the categories list when the component mounts
  useEffect(() => {
    dispatch(fetchCategoriesListAction());
  }, [dispatch]);

  // Toggle the "Show More" state when the button is pressed.
  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  const renderItem = useCallback(
    ({item}: {item: CategoryImageKeys}) => (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.categoryContainer}
        onPress={() => {
          onSelectCategory(item);
        }}>
        <FastImage
          source={categoryImages[item]}
          style={styles.imageStyle}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Label
          labelStyle={styles.categoryText}
          title={item}
          capitalizeFirstLetter={true}
        />
      </TouchableOpacity>
    ),
    [onSelectCategory],
  );

  // Render the "See More" button if there are more than 6 categories.
  const renderFooter = () => (
    <View style={styles.footer}>
      {categories.length > 6 && (
        <TouchableOpacity activeOpacity={0.9} onPress={toggleShowMore} style={styles.button}>
          <Label
            labelStyle={styles.buttonText}
            title={
              showMore
                ? strings.SearchScreen.seeLess
                : strings.SearchScreen.seeMore
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );

  // Determine the displayed categories based on the "showMore" state.
  const displayedCategories = useMemo(
    () => (showMore ? categories : categories.slice(0, 6)),
    [showMore, categories],
  );

  return (
    <View style={styles.container}>
      <Label
        labelStyle={styles.title}
        title={strings.SearchScreen.categories}
      />

      <FlatList
        /**
         * Casting 'displayedCategories' to 'CategoryImageKeys[]' to ensure
          that it matches the expected data type for the FlatList's 'data' prop.
        */
        data={displayedCategories as CategoryImageKeys[]}
        renderItem={renderItem}
        keyExtractor={(item: CategoryImageKeys, index: number) =>
          Utility.convertToString(index)
        }
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};
