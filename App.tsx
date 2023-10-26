import React, {useEffect} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {AppNavigator} from './src/navigation';
import {colors} from './src/common/theme/colors';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {SafeArea} from './src/common/components/SafeArea';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

interface stylePropTypes {
  container: ViewStyle;
  topSafeAreaStyle: ViewStyle;
  bottomSafeAreaStyle: ViewStyle;
}

const styles = StyleSheet.create<stylePropTypes>({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSafeAreaStyle: {
    flex: 0,
    backgroundColor: colors.primary,
  },
  bottomSafeAreaStyle: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});

const App: React.FC = () => {
  useEffect(() => {
    LottieSplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeArea>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </SafeArea>
    </Provider>
  );
};

export default App;
