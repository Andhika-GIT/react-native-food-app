import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

// components
import { Button, Gap, Header, ItemListFood, ItemValue } from '../../components';
import { FoodDummy1 } from '../../assets';

const OrderSummary = ({ navigation, route }) => {
  const { item, transactions, userProfile } = route.params;
  return (
    <ScrollView>
      <Header title="Payment" subTitle="You deserve better meal" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListFood type="order-summary" name={item.name} price={item.price} image={item.picturePath} items={transactions.totalItem} />
        <Text style={styles.label}>Detail Transaction</Text>
        <ItemValue label={item.name} value={transactions.totalPrice} type="currency" />
        <ItemValue label="Driver" value={transactions.driver} type="currency" />
        <ItemValue label="Tax 10%" value={transactions.tax} type="currency" />
        <ItemValue label="Total Price" value={transactions.total} valueColor="#1ABC9C" type="currency" />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Name" value={userProfile.name} />
        <ItemValue label="Phone No." value={userProfile.phoneNumber} />
        <ItemValue label="Address" value={userProfile.address} />
        <ItemValue label="House No.0" value={userProfile.houseNumber} />
        <ItemValue label="City" value={userProfile.city} />
      </View>

      <View style={styles.button}>
        <Button text="Checkout Now" onPress={() => navigation.replace('SuccessOrder')} />
      </View>
      <Gap height={40} />
    </ScrollView>
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
