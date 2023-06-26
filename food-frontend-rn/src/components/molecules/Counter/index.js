import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

// assets
import { IcMin, IcPlus } from '../../../assets';

const Counter = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <IcMin />
      </TouchableOpacity>
      <Text style={styles.value}>14</Text>
      <TouchableOpacity>
        <IcPlus />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontFamily: 'poppins-reguler',
    color: '#020202',
    marginHorizontal: 10,
  },
});
