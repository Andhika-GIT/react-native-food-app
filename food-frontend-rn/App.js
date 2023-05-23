import * as React from 'react';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import main router
import Router from './src/router';

// for fonts
import { useFonts } from 'expo-font';
import * as SplashScreens from 'expo-splash-screen';

function App() {
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
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default App;
