import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IlEmptyOrder } from '../../../assets';

// components
import { Button, Gap } from '../../atoms';

// navigation
import { useNavigation } from '@react-navigation/native';

const EmptyOrder = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <IlEmptyOrder />
      <Gap height={30} />
      <Text style={styles.title}>Ouch! Hungry</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Seems like you have not</Text>
      <Text style={styles.subTitle}>ordered any food yet</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button text="Find Foods" onPress={() => navigation.replace('MainApp')} />
      </View>
    </View>
  );
};

export default EmptyOrder;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontFamily: 'poppins-reguler',
    color: '#020202',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'poppins-light',
    color: '#8D92A3',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
});
