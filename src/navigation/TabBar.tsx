import React, {useEffect, useRef} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {colors} from '../common/theme/colors';
import {Label} from '../common/components/Label';
import {TabBarPropTypes} from './index';
import {styles} from './TabBar.style';

// Animation effect when tab is switched
export const TabBar: React.FC<TabBarPropTypes> = ({
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
