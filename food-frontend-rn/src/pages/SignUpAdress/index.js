import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import axios from 'axios';

import { showMessage, hideMessage } from 'react-native-flash-message';

// components
import { Header, TextInput, Gap, Button, Select } from '../../components';

// redux
import { useSelector } from 'react-redux';
import { setAddress } from '../../store';

// custom hooks
import { useForm } from '../../utils';

const SignUpAdress = ({ navigation }) => {
  const [form, setForm] = useForm({
    address: '',
    city: 'Bandung',
    houseNumber: '',
    phoneNumber: '',
  });

  const registerData = useSelector((state) => state.register);

  const showToast = (message, type) => {
    showMessage({
      message,
      type: type === 'success' ? 'success' : 'danger',
      backgroundColor: type === 'success' ? '#1ABC9C' : '#D9435E',
    });
  };

  const onSubmit = () => {
    // dispatch(setAddress(form));

    const data = {
      ...form,
      ...registerData,
    };

    axios
      .post('http://192.168.1.8:8000/api/register', data)
      .then((res) => {
        showToast('Register success', 'success');
        navigation.replace('SuccessSignUp');
      })
      .catch((err) => {
        showToast(err?.response?.data?.data?.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header title="Address" subTitle="Make sure it's valid" onBack={() => {}} />
        <View style={styles.container}>
          <TextInput label="Phone No." placeholder="Type your phone number" value={form.phoneNumber} onChangeText={(value) => setForm('phoneNumber', value)} />
          <Gap height={16} />
          <TextInput label="Address" placeholder="Type your address" value={form.address} onChangeText={(value) => setForm('address', value)} />
          <Gap height={16} />
          <TextInput label="House No." placeholder="Type your house number" value={form.houseNumber} onChangeText={(value) => setForm('houseNumber', value)} />
          <Gap height={24} />
          <Select label="City" value={form.city} onSelectChange={(value) => setForm('city', value)} />
          <Gap height={16} />
          <Button text="Sign Up Now" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpAdress;

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
