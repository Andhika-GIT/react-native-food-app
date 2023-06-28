import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

// components
import { Header, TextInput, Gap, Button, Select } from '../../components';

// redux
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { setError, setAddress } from '../../store';

// custom hooks
import { useForm } from '../../utils';

const SignUpAdress = ({ navigation }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    address: '',
    city: 'Bandung',
    houseNumber: '',
    phoneNumber: '',
  });

  const onSubmit = () => {
    dispatch(setAddress(form));

    navigation.replace('SuccessSignUp');
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
