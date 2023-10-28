import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {Gradient} from '../../common/components/LinearGradient';
import {LoadingIndicator} from '../../common/components/LoadingIndicator';
import {ProductCard} from '../../common/components/ProductCard/ProductCard';
import {Label} from '../../common/components/Label';
import CategoryList from './CategoryList';
import {colors} from '../../common/theme/colors';
import {strings} from '../../common/strings';
import {
  fetchProductsByCategoryAction,
  searchProductsAction,
} from '../../store/actions';
import {
  ProductSliceStateTypes,
  ProductTypes,
  NavigationTypes,
} from '../../types/commonTypes';
import Utility from '../../common/Utility';
import {styles} from './SearchScreen.style';

export const SearchScreen: React.FC<NavigationTypes> = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [results, setResults] = useState<ProductTypes[]>([]);
  const itemHeight = moderateScale(250); // Height of a product card

  // Retrieve search results, loading status, and products by category from the Redux store
  const {searchResults, productsByCategory, loadingStatus} = useSelector(
    (state: {product: ProductSliceStateTypes}) => state.product,
  );
  const dispatch = useDispatch();

  //To filter products by category or search terms
  const filterProductsByCategory = useCallback(() => {
    if (selectedCategory) {
      setResults(productsByCategory);
    } else {
      setResults(searchResults);
    }
  }, [selectedCategory, productsByCategory, searchResults]);

  // Fetch search results based on the search term
  useEffect(() => {
    dispatch(searchProductsAction(searchTerm.toLowerCase()));
  }, [searchTerm, dispatch]);

  // Determine how to display products based on category or search term
  useEffect(() => {
    filterProductsByCategory();
  }, [productsByCategory, searchTerm, searchResults, filterProductsByCategory]);

  // Fetch results based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsByCategoryAction(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  // Dismiss the keyboard and clear the search term when appropriate
  useEffect(() => {
    if (
      !isSearchFocused &&
      Utility.checkIsNull(selectedCategory) &&
      !Utility.checkIsNull(searchTerm)
    ) {
      Keyboard.dismiss();
      clearSearch();
    }
  }, [isSearchFocused, selectedCategory, searchTerm]);

  const clearSearch = () => setSearchTerm('');

  const handleSearchFocus = () => setIsSearchFocused(true);

  const onBackPress = () => {
    setIsSearchFocused(false);
    setSelectedCategory(null);
  };

  const renderIcon = (
    iconName: string,
    action: () => void,
    iconStyles: ViewStyle,
  ) => {
    return (
      <TouchableOpacity activeOpacity={1.0} onPress={action} style={iconStyles}>
        <Ionicons
          name={iconName}
          size={moderateScale(24)}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  // Determine the title for search results
  const handleResultsTitle = () => {
    if (selectedCategory) {
      return selectedCategory;
    } else if (results && !searchTerm) {
      return strings.SearchScreen.topSearches;
    } else {
      return strings.SearchScreen.results;
    }
  };

  const renderSearchResultItem = ({item}: {item: ProductTypes}) => {
    return (
      <ProductCard
        imageUri={item.thumbnail}
        productName={item.title}
        productPrice={item.price}
        onPress={() => {
          navigation.navigate('Details', {...item});
        }}
      />
    );
  };

  const handleChangeText = (text: string) => {
    if (selectedCategory) {
      setSelectedCategory(null);
    }
    setSearchTerm(text);
  };

  return (
    <Gradient>
      <LoadingIndicator loading={loadingStatus.search} color={colors.base} />
      <View style={styles.searchBarContainer}>
        {isSearchFocused || selectedCategory
          ? renderIcon('chevron-back', onBackPress, styles.searchBarIcons)
          : renderIcon('search', () => {}, styles.searchBarIcons)}

        <TextInput
          style={styles.searchBarInput}
          value={searchTerm}
          selectionColor={colors.base}
          onChangeText={handleChangeText}
          placeholder={strings.SearchScreen.placeHolder}
          onFocus={handleSearchFocus}
        />

        {searchTerm
          ? renderIcon('close', clearSearch, styles.searchBarCloseIcon)
          : null}
      </View>

      {!isSearchFocused && Utility.checkIsNull(selectedCategory) ? (
        <CategoryList
          onSelectCategory={(category: string) => {
            setResults([]);
            setSelectedCategory(category);
          }}
        />
      ) : searchTerm && results.length === 0 ? (
        <View style={styles.noResultsView}>
          <Label
            title={strings.SearchScreen.noResults}
            labelStyle={styles.noResultsText}
          />
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderSearchResultItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: ProductTypes, index: number) =>
            Utility.convertToString(index)
          }
          getItemLayout={Utility.getItemLayout(itemHeight)}
          ListHeaderComponent={
            <Label
              title={handleResultsTitle()}
              labelStyle={styles.resultsHeaderStyle}
              capitalizeFirstLetter={true}
            />
          }
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      )}
    </Gradient>
  );
};
