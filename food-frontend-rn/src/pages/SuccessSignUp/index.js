import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// assets
import { IlSuccessSignUp } from '../../assets';

// components
import { Button, Gap } from '../../components';

// redux
import { useDispatch, useSelector } from 'react-redux';

const SuccessSignUp = ({ navigation }) => {
  const registerform = useSelector((state) => state.register);

  console.log(registerform);
  return (
    <View style={styles.page}>
      <IlSuccessSignUp />
      <Gap height={30} />
      <Text style={styles.title}>Yeay! Completed</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Now you are able to order</Text>
      <Text style={styles.subTitle}>some foods as a self-reward</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button text="Find Foods" onPress={() => navigation.replace('MainApp')} />
      </View>
    </View>
  );
};

export default SuccessSignUp;

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
