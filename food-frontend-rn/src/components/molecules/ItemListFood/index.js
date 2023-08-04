import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Rating from '../Rating';

import Number from '../Number';

const ItemListFood = ({ image, onPress, rating, items, price, type, name, date, status }) => {
  const renderContent = () => {
    switch (type) {
      case 'product':
        // item list product seperti di home page
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Rating number={rating} />
          </>
        );

      case 'order-summary':
        // item order summary
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Text style={styles.items}>{items} items</Text>
          </>
        );

      case 'in-progress':
        // item in progress
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.price}>
                {items} items . IDR {price}
              </Text>
            </View>
          </>
        );

      case 'past-orders':
        // item past orders
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.price}>
                {items} items . IDR {price}
              </Text>
            </View>
            <View>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.status}>{status}</Text>
            </View>
          </>
        );

      default:
        // item product
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Rating />
          </>
        );
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        {renderContent(type)}
      </View>
    </TouchableOpacity>
  );
};

export default ItemListFood;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: 'white', paddingVertical: 8, alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 8, overflow: 'hidden', marginRight: 12 },
  content: { flex: 1 },
  title: { fontFamily: 'poppins-reguler', fontSize: 16, color: '#020202' },
  price: { fontFamily: 'poppins-reguler', fontSize: 13, color: '#8D92A3' },
  items: { fontSize: 13, fontFamily: 'poppins-reguler', color: '#8D92A3' },
  date: { fontSize: 10, fontFamily: 'poppins-reguler', color: '#8D92A3' },
  status: { fontSize: 10, fontFamily: 'poppins-reguler', color: '#D9435E' },
});
