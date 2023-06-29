import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useCallback } from 'react';
import FlashMessage from 'react-native-flash-message';

import { Loading } from './src/components';

// import main router
import Router from './src/router';

// for fonts
import { useFonts } from 'expo-font';
import * as SplashScreens from 'expo-splash-screen';

// redux
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';

const MainApp = () => {
  // redux setup
  const { isLoading } = useSelector((state) => state.global);

  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" style={{ paddingTop: 50 }} />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  // import fonts
  const [isLoaded] = useFonts({
    'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
    'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'poppins-reguler': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  // hide SplashScreens
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreens.hideAsync(); //hide the SplashScreens
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
