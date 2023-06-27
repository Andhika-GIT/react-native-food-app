import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

// components
import { EmptyOrder, Header, OrderTabSection } from '../../components';

const Order = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  return (
    <View style={styles.page}>
      {isEmpty ? (
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
