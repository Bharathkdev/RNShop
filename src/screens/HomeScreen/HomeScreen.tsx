import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {fetchProductsListAction} from '../../store/actions';
import {setProductsAction} from '../../store/reducer';
import ProductCard from '../../common/components/ProductCard/ProductCard';
import Label from '../../common/components/Label';
import Gradient from '../../common/components/LinearGradient';
import {HomeLoader} from '../../common/components/HomeLoader';
import {LoadingIndicator} from '../../common/components/LoadingIndicator';
import ProductCarousel from '../../common/components/ProductCarousel/ProductCarousel';
import {colors} from '../../common/theme/colors';
import {strings} from '../../common/strings';
import Utility from '../../common/Utility';

import {
  ProductSliceStateTypes,
  ProductTypes,
  NavigationTypes,
} from '../../types/commonTypes';
import {styles} from './HomeScreen.style';

// Image URLs for the carousel
const carouselImages = [
  'https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/f6e98d0a-8121-4f3f-8179-1b7edf4809c4.jpeg',
  'https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/c5858733-fef6-41c4-8b68-56ef5664483e.jpg',
  'https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/9077b67a-0cb3-401f-ba95-85abd639e013.jpg',
  'https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/fcc47153-338b-4c70-b80b-08a74dd11a82.jpeg',
  'https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/6f207c8a-9b5d-412d-92f6-9cc7965a5fc3.jpg',
];

export const HomeScreen: React.FC<NavigationTypes> = ({navigation}) => {
  const [page, setPage] = useState<number>(1); // Current page
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Retrieve Products List, loading status and total products from the Redux store
  const {products, loadingStatus, totalProducts} = useSelector(
    (state: {product: ProductSliceStateTypes}) => state.product,
  );
  const dispatch = useDispatch();

  const limit = 20; // Number of products per page
  const itemHeight = moderateScale(250); // Height of a product card

  useEffect(() => {
    /**
      * Fetch the initial page of data when the component mounts.
      * Pagination is utilized to limit the number of items fetched at once,
      improving initial screen rendering time by loading data in smaller chunks.
    **/
    dispatch(fetchProductsListAction({limit, skip: 0}));
  }, [dispatch]);

  // Load more data when the user scrolls to the end of the list
  const loadMoreData = useCallback(() => {
    try {
      const skip = page * limit; // Calculate the skip value for the next page

      // Fetch the next page of data and append it to the existing data
      dispatch(fetchProductsListAction({limit, skip}));
      setPage(page + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    }
  }, [dispatch, page, limit]);

  // Refresh the data when the user pulls down
  const handleRefresh = () => {
    setIsRefreshing(true);
    try {
      // Clear the existing data and fetch the first page
      dispatch(setProductsAction([]));
      dispatch(fetchProductsListAction({limit, skip: 0}));
      setIsRefreshing(false);
    } catch (error) {
      setIsRefreshing(false);
      console.error('Error loading more data:', error);
    }
  };

  // Render a single product item
  const renderProductItem: ListRenderItem<ProductTypes> = useCallback(
    ({item}) => (
      <ProductCard
        imageUri={item.thumbnail}
        productName={item.title}
        productPrice={item.price}
        onPress={() => {
          navigation.navigate('Details', {...item});
        }}
      />
    ),
    [navigation],
  );

  // Render the list header with the product carousel and discount banner
  const renderHeader = () => {
    return (
      <>
        <ProductCarousel
          carouselImages={carouselImages}
          resizeMode="cover"
          isDetailsScreen={false}
        />
        <View style={styles.discountBanner}>
          <View style={styles.discountIconContainer}>
            <MaterialIcons name="discount" size={25} color={colors.dark} />
          </View>
          <Label
            labelStyle={styles.discountText}
            title={strings.HomeScreen.discountBannerText}
          />
          <Label labelStyle={styles.fireEmoji} title="🔥" />
        </View>
      </>
    );
  };

  // Render the list footer with a loading indicator or a message when there is no more data
  const renderFooter = () => {
    if (totalProducts === products.length) {
      return (
        <Label
          title={strings.HomeScreen.noMoreData}
          labelStyle={styles.listFooter}
        />
      );
    }
    return (
      <View style={styles.loadingIndicator}>
        <LoadingIndicator
          loading={totalProducts === products.length ? false : true}
          color={colors.base}
        />
      </View>
    );
  };

  // Render the logo
  const renderLogo = () => {
    return (
      <FastImage
        source={require('../../../assets/images/logo.png')}
        style={styles.logoImageStyle}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  };

  return (
    <Gradient>
      {loadingStatus.home && products.length < 20 && <HomeLoader />}
      <View style={styles.logoStyle}>{renderLogo()}</View>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item: ProductTypes, index: number) =>
            Utility.convertToString(index)
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          /**
            getItemLayout precalculates the layout for each item, improving performance
            by avoiding dynamic measurements during rendering.
          **/
          getItemLayout={Utility.getItemLayout(itemHeight)}
          removeClippedSubviews
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          onEndReached={loadMoreData} // Call `loadMoreData` when the end of the list is reached
          onEndReachedThreshold={0.1} // Load more data when 10% from the end is reached
          ListFooterComponent={renderFooter}
        />
      </View>
    </Gradient>
  );
};
