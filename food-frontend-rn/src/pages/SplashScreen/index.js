import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// icons or logo
import { Logo } from '../../assets';

const SplashScreen = () => {
  return (
    <View style={styles.Background}>
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
  },
});
