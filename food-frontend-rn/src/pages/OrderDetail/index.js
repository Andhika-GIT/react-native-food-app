import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

import axios from 'axios';

import { Button, Gap, Header, ItemListFood, ItemValue } from '../../components';
import { FoodDummy1 } from '../../assets';

// ENV
import { API_URL } from '@env';
import { getData } from '../../utils';

const OrderDetail = ({ route, navigation }) => {
  const order = route.params;

  const onCancel = () => {
    const data = {
      status: 'CANCELLED',
    };
    getData('token').then((resToken) => {
      axios
        .post(`${API_URL}/transaction/${order.id}`, data, {
          headers: {
            Authorization: resToken.value,
          },
        })
        .then((res) => {
          console.log(res);
          navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  };
  return (
    <ScrollView>
      <Header title="Order Detail" subTitle="You deserve better meal" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListFood type="order-summary" name={order.food.name} price={order.food.price} image={FoodDummy1} items={order.quantity} />
        <Text style={styles.label}>Detail Transaction</Text>
        <ItemValue label={order.food.name} value={order.food.price * order.quantity} type="currency" />
        <ItemValue label="Driver" value={50000} type="currency" />
        <ItemValue label="Tax 10%" value={(10 / 100) * order.total} type="currency" />
        <ItemValue label="Total Price" value={order.total} valueColor="#1ABC9C" type="currency" />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Name" value={order.user.name} />
        <ItemValue label="Phone No." value={order.user.phoneNumber} />
        <ItemValue label="Address" value={order.user.address} />
        <ItemValue label="House No.0" value={order.user.houseNumber} />
        <ItemValue label="City" value={order.user.city} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Order Status:</Text>
        <ItemValue label={`#${order.id}`} value={order.status} valueColor={order.status === 'CANCELLED' ? '#D9435E' : '#1ABC9C'} />
      </View>

      {order.status === 'PENDING' && (
        <View style={styles.button}>
          <Button text="Cancel My Order" color="#D9435E" textColor="white" onPress={onCancel} />
        </View>
      )}
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderDetail;

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
