import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import axios from "axios";

// utils
import { showMessage } from "../../utils";

// components
import {
  Header,
  TextInput,
  Gap,
  Button,
  Select,
  Loading,
} from "../../components";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setLoading, signUp } from "../../store";

// custom hooks
import { useForm } from "../../utils";

// custom hooks
import { useThunk } from "../../hooks/use-thunk";

const SignUpAdress = ({ navigation }) => {
  const [doSignUpUser, isLoading, error] = useThunk(signUp);
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    address: "",
    city: "Bandung",
    houseNumber: "",
    phoneNumber: "",
  });

  const register = useSelector((state) => state.register);
  const photo = useSelector((state) => state.photo);

  const onSubmit = () => {
    // dispatch(setAddress(form));

    const data = {
      ...form,
      ...register,
    };

    dispatch(setLoading(true));
    doSignUpUser(data, photo);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header
          title="Address"
          subTitle="Make sure it's valid"
          onBack={() => {}}
        />
        <View style={styles.container}>
          <TextInput
            label="Phone No."
            placeholder="Type your phone number"
            value={form.phoneNumber}
            onChangeText={(value) => setForm("phoneNumber", value)}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            value={form.address}
            onChangeText={(value) => setForm("address", value)}
          />
          <Gap height={16} />
          <TextInput
            label="House No."
            placeholder="Type your house number"
            value={form.houseNumber}
            onChangeText={(value) => setForm("houseNumber", value)}
          />
          <Gap height={24} />
          <Select
            label="City"
            value={form.city}
            onSelectChange={(value) => setForm("city", value)}
          />
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
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
