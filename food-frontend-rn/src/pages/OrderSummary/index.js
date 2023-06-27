import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// components
import { Button, Header, ItemListFood, ItemValue } from '../../components';
import { FoodDummy1 } from '../../assets';

const OrderSummary = ({ navigation }) => {
  return (
    <View>
      <Header title="Payment" subTitle="Yu deserve better meal" onBack={() => {}} />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListFood image={FoodDummy1} items={14} />
        <Text style={styles.label}>Detail Transaction</Text>
        <ItemValue label="Cherry Healthy" value="IDR 18.390.000" />
        <ItemValue label="Driver" value="IDR 50.000" />
        <ItemValue label="Tax 10%" value="IDR 1.000.390" />
        <ItemValue label="Total Price" value="IDR 390.803.000" valueColor="#1ABC9C" />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Name" value="Angga" />
        <ItemValue label="Phone No." value="0822 0819 9688" />
        <ItemValue label="Address" value="Setra Duta Palima" />
        <ItemValue label="House No.0" value="A5 Hook" />
        <ItemValue label="City" value="Jakarta" />
      </View>

      <View style={styles.button}>
        <Button text="Checkout Now" onPress={() => navigation.replace('SuccessOrder')} />
      </View>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'poppins-reguler',
    color: '#020202',
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
