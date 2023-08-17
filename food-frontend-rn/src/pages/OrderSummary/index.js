import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { WebView } from 'react-native-webview';

// components
import { Button, Gap, Header, ItemListFood, ItemValue, Loading } from '../../components';
import { FoodDummy1 } from '../../assets';
import axios from 'axios';

// ENV
import { API_URL } from '@env';
import { getData } from '../../utils';

const OrderSummary = ({ navigation, route }) => {
  const { item, transactions, userProfile } = route.params;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentURL, setPaymentURL] = useState('https://www.google.com/');

  const onCheckOut = () => {
    const data = {
      food_id: item.id,
      user_id: userProfile.id,
      quantity: transactions.totalItem,
      total: transactions.total,
      status: 'PENDING',
    };

    getData('token').then((resToken) => {
      axios
        .post(`${API_URL}/checkout`, data, {
          headers: {
            Authorization: resToken.value,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setIsPaymentOpen(true);
          setPaymentURL(res.data.data.payment_url);
          // navigation.replace('SuccessOrder');
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  const onNavChange = (state) => {
    const status = state.url?.split('&')?.slice(1)?.shift()?.split('=')?.pop();
    console.log(status);
    if (status) {
      console.log('success');
      navigation.reset({ index: 0, routes: [{ name: 'SuccessOrder' }] });
    }
  };

  if (isPaymentOpen) {
    return (
      <>
        <Header title="Payment" subTitle="You deserve better meal" onBack={() => navigation.goBack()} />
        <WebView source={{ uri: paymentURL }} style={{ flex: 1 }} startInLoadingState={true} renderLoading={() => <Loading />} onNavigationStateChange={onNavChange} />
      </>
    );
  }

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
        <Button text="Checkout Now" onPress={onCheckOut} />
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
