import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

// icons or logo
import { Logo } from '../../assets';
import { getData } from '../../utils';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      getData('token').then((res) => {
        console.log(res);
        if (res) {
          navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
        } else {
          navigation.replace('SignIn');
        }
      });
    }, 2000);
  }, []);

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
    fontFamily: 'poppins-medium',
  },
});
