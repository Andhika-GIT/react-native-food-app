import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';

// icons or logo
import { Logo } from '../../assets';

// for fonts
import { useFonts } from 'expo-font';
import * as SplashScreens from 'expo-splash-screen';

SplashScreens.preventAutoHideAsync();

const SplashScreen = () => {
  // import fonts
  const [isLoaded] = useFonts({
    'poppins-light': require('../../../assets/fonts/Poppins-Light.ttf'),
    'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
    'poppins-reguler': require('../../../assets/fonts/Poppins-Regular.ttf'),
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
    <View style={styles.Background} onLayout={handleOnLayout}>
      <Logo />
      <Text style={styles.Text}>FoodMarket</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#FFC700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    marginTop: 38,
    fontSize: 32,
    color: '#020202',
    fontFamily: 'poppins-medium',
  },
});
