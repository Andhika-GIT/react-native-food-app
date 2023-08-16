import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

// components
import { EmptyOrder, Header, OrderTabSection } from '../../components';

// utils
import { useThunk } from '../../hooks/use-thunk';

// thunk action
import { getOrders } from '../../store';

// redux
import { useSelector } from 'react-redux';

const Order = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [doGetOrders, isLoading, error] = useThunk(getOrders);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    doGetOrders();
  }, []);

  return (
    <View style={styles.page}>
      {orders.length < 1 ? (
        <EmptyOrder />
      ) : (
        <View style={styles.container}>
          <Header title="Your Orders" subTitle="Wait or the best meal" />
          <View style={styles.tabContainer}>
            <OrderTabSection />
          </View>
        </View>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContainer: {
    flex: 1,
    marginTop: 24,
  },
});
