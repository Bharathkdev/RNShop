import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../common/theme/colors';
import {Label} from '../common/components/Label';
import {commonTheme} from '../common/theme';
import {TabBarProps} from './index';

interface stylePropTypes {
  tabBarContainer: ViewStyle;
  tabItem: ViewStyle;
  tabItemContainer: ViewStyle;
  tabLabel: TextStyle;
  animatedTab: ViewStyle;
}

const styles = StyleSheet.create<stylePropTypes>({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    padding: moderateScale(5),
    height: '10%',
    width: '100%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemContainer: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: commonTheme.fontSizes.m,
    paddingBottom: moderateScale(10),
  },
  animatedTab: {
    position: 'absolute',
    bottom: moderateScale(5),
    height: '100%',
    width: '50%',
    padding: moderateScale(5),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
  },
});

export const TabBar: React.FC<TabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const animatedValue = useRef(new Animated.Value(state.index)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: state.index,
      duration: 300,
      // Using the native driver can significantly improve animation performance
      // by offloading animations to the native side.
      useNativeDriver: true,
    }).start();
  }, [state.index, animatedValue]);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const title = options.title || route.name;
        const iconColor = colors.base;

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => navigation.navigate(route.name)}>
            <View style={styles.tabItemContainer}>
              <Animated.View
                style={[
                  styles.animatedTab,
                  {
                    transform: [
                      {
                        translateX: animatedValue.interpolate({
                          inputRange: [index - 1, index, index + 1],
                          outputRange: [0, 0, 50],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                    opacity: animatedValue.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [0, 1, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              />
              <AntDesign
                name={route.name === 'HomeStack' ? 'home' : 'search1'}
                size={25}
                color={iconColor}
              />
              <Label
                title={title}
                labelStyle={{...styles.tabLabel, color: iconColor}}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
