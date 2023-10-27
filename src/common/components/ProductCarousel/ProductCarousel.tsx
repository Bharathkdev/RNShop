import React, {useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {moderateScale} from 'react-native-size-matters';
import {LoadingIndicator} from '../LoadingIndicator';
import {colors} from '../../theme/colors';
import FastImage from 'react-native-fast-image';
import {styles} from './ProductCarousel.style';

interface ProductCarouselTypes {
  carouselImages: string[];
  resizeMode: 'cover' | 'contain' | 'center' | 'stretch';
  isDetailsScreen: boolean;
}

export const ProductCarousel: React.FC<ProductCarouselTypes> = props => {
  const carouselRef = useRef<Carousel<string> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const width = Dimensions.get('window').width;
  const {carouselImages, resizeMode, isDetailsScreen} = props;

  // Hide loader when the carousel image is loaded
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const carouselRenderItem = ({item}: {item: string}) => {
    return (
      <View style={styles.carouselView}>
        <FastImage
          source={{
            uri: item,
            priority: FastImage.priority.high,
          }}
          style={[
            styles.imageStyle,
            {height: isDetailsScreen ? '100%' : moderateScale(335)},
          ]}
          resizeMode={resizeMode}
          onLoadEnd={handleImageLoad} // Show loader until image is loaded
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LoadingIndicator loading={isLoading} color={colors.base} />
      <Carousel
        ref={(c: Carousel<string> | null) => {
          carouselRef.current = c;
        }}
        layout={'default'}
        data={carouselImages}
        renderItem={carouselRenderItem}
        sliderWidth={width}
        itemWidth={width}
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
        height={isDetailsScreen ? width / 1.5 : width / 2}
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
