import React, {useCallback, useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

import {LoadingIndicator} from '../LoadingIndicator';
import {colors} from '../../theme/colors';
import {styles} from './ProductCarousel.style';

interface ProductCarouselTypes {
  carouselImages: string[];
  resizeMode: 'cover' | 'contain' | 'center' | 'stretch';
  isDetailsScreen: boolean;
}

const ProductCarousel: React.FC<ProductCarouselTypes> = ({
  carouselImages,
  resizeMode,
  isDetailsScreen,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const carouselRef = useRef<Carousel<string> | null>(null);
  const windowWidth = Dimensions.get('window').width;

  // Hide loader when the carousel image is loaded
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Memoize the renderCarouselItem function to prevent unwanted re-creation
  const renderCarouselItem = useCallback(
    ({item}: {item: string}) => {
      return (
        <View style={styles.carouselView}>
          <FastImage
            source={{
              uri: item,
              priority: FastImage.priority.high,
            }}
            style={[
              styles.imageStyle,
              // eslint-disable-next-line react-native/no-inline-styles
              {height: isDetailsScreen ? '100%' : moderateScale(328)},
            ]}
            resizeMode={resizeMode}
            onLoadEnd={handleImageLoad}
          />
        </View>
      );
    },
    [handleImageLoad, isDetailsScreen, resizeMode],
  );

  return (
    <View style={styles.container}>
      <LoadingIndicator loading={isLoading} color={colors.base} />
      <Carousel
        ref={(c: Carousel<string> | null) => {
          carouselRef.current = c;
        }}
        layout={'default'}
        data={carouselImages}
        renderItem={renderCarouselItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        /**
          * react-native-snap-carousel adds this AnimatedComponent between the renderItem
          of the virtualized list and the actual item we provide.

          * So even if we memoize our item, this AnimatedComponent will still be re-rendered since
          react-native-snap-carousel doesn't memoize it (and it should), so if we have limited
          items in the carousel we can set useScrollView to true which will disableVirtualization.
        **/
        useScrollView={true}
        autoplay={isDetailsScreen ? false : true}
        autoplayInterval={3000}
        loop={true}
        activeSlideAlignment="center"
        onSnapToItem={(index: number) => {
          setActiveSlide(index);
        }}
        enableMomentum={true}
        removeClippedSubviews={false}
        decelerationRate={0.9}
        //@ts-ignore
        height={isDetailsScreen ? windowWidth / 1.5 : windowWidth / 2}
        lockScrollWhileSnapping={true}
        loopClonesPerSide={carouselImages.length}
      />
      <Pagination
        dotsLength={carouselImages.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainerStyle}
        dotStyle={styles.paginationDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

/**
 * Memoize the entire component with React.memo to prevent unneccesary
  re-renders when props haven't changed.
*/
export default React.memo(ProductCarousel);
