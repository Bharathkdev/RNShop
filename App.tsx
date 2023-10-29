import React, {useEffect} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import {Provider} from 'react-redux';

import {AppNavigator} from './src/navigation';
import {colors} from './src/common/theme/colors';
import {store} from './src/store';
import SafeArea from './src/common/components/SafeArea';

interface StylePropTypes {
  container: ViewStyle;
}

const styles = StyleSheet.create<StylePropTypes>({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
