import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//  components
import { Header, TextInput, Button, Gap } from '../../components';

// custom hooks
import { getData, useForm } from '../../utils';
import { useThunk } from '../../hooks/use-thunk';

// redux
import { useSelector, useDispatch } from 'react-redux';

// redux store
import { setLoading, signIn } from '../../store';

const SignIn = ({ navigation }) => {
  const [doSignInUser, isLoading, error] = useThunk(signIn);
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    dispatch(setLoading(true));

    doSignInUser({ form, navigation });

    // navigation.navigate('MainApp');
  };
  return (
    <View style={styles.page}>
      <Header title="Sign In" subTitle="Find your best ever meal" />
      <View style={styles.container}>
        <TextInput label="Email Adress" placeholder="Type your email address" value={form.email} onChangeText={(value) => setForm('email', value)} />
        <Gap height={16} />
        <TextInput label="Password" placeholder="Type your password" value={form.password} onChangeText={(value) => setForm('password', value)} secureTextEntry />
        <Gap height={24} />
        <Button text="Sign in" onPress={onSubmit} />
        <Gap height={12} />
        <Button text="Create New Account" color="#8D92A3" textColor="white" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
};

export default SignIn;

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
});
