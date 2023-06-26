import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import { FoodDummy1 } from '../../../assets';
import Rating from '../Rating';

const ItemListFood = ({ image }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 24, paddingVertical: 8, alignItems: 'center' }}>
      <Image source={image} style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'poppins-reguler', fontSize: 16, color: '#020202' }}>Soup Bumil</Text>
        <Text style={{ fontFamily: 'poppins-reguler', fontSize: 13, color: '#8D92A3' }}>IDR 289.000</Text>
      </View>
      <Rating />
    </View>
  );
};

export default ItemListFood;

const styles = StyleSheet.create({});
