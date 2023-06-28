import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

//  components
import { Header, TextInput, Button, Gap } from '../../components';

// custom hooks
import { useForm } from '../../utils';

const SignIn = ({ navigation }) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    axios
      .post('http://192.168.1.8:8000/api/login', form)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
