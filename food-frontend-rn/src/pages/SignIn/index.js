import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

//  components
import { Header, TextInput, Button } from '../../components';

const SignIn = () => {
  return (
    <View>
      <Header />
      <View>
        <TextInput />
        <TextInput />
        <Button />
        <Button />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
