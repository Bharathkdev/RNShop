import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen/ProductDetailsScreen';
import {SearchScreen} from '../screens/SearchScreen/SearchScreen';
import {TabBar} from './TabBar';
import {strings} from '../common/strings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* @ts-ignore */}
      <Stack.Screen name="Details" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

const SearchStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      {/* @ts-ignore */}
      <Stack.Screen name="Details" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

//Pick<T, K>: Useful when you want to create a type with only a subset of properties from another type.
export type TabBarPropTypes = Pick<
  BottomTabBarProps,
  'state' | 'descriptors' | 'navigation'
>;

const tabBarComponent: React.FC<TabBarPropTypes> = props => {
  return <TabBar {...props} />;
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={tabBarComponent}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: strings.TabBar.homeTitle,
          }}
        />
        <Tab.Screen
          name="SearchStack"
          component={SearchStack}
          options={{
            title: strings.TabBar.searchTitle,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
