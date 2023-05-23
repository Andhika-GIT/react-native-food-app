import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = ({ title, subTitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: 'poppins-medium',
    color: '#020202',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'poppins-light',
    color: '#8092A3',
  },
});
