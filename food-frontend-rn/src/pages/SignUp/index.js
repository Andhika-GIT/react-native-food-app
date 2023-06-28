import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// components
import { Header, TextInput, Gap, Button } from '../../components';

// redux
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { setError } from '../../store';

const SignUp = ({ navigation }) => {
  const globalState = useSelector((state) => state.global);
  console.log(globalState);
  return (
    <View style={styles.page}>
      <Header title="Sign Up" subTitle="Register and eat" onBack={() => {}} />
      <View style={styles.container}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <View style={styles.photoContainer}>
              <Text style={styles.addPhoto}>Add Photo</Text>
            </View>
          </View>
        </View>
        <TextInput label="Full Name" placeholder="Type your full name" />
        <Gap height={16} />
        <TextInput label="Email Adress" placeholder="Type your email address" />
        <Gap height={16} />
        <TextInput label="Password" placeholder="Type your password" />
        <Gap height={24} />
        <Button text="Continue" onPress={() => navigation.navigate('SignUpAdress')} />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8092A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  addPhoto: {
    fontSize: 14,
    fontWeight: 300,
    fontFamily: 'poppins-light',
    textAlign: 'center',
  },
});
