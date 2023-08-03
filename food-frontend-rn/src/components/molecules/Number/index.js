import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NumericFormat } from 'react-number-format';

const Number = ({ number }) => {
  return <NumericFormat value={number} thousandSeparator="." renderText={(value) => <Text>{value}</Text>} decimalScale="." displayType="text" prefix="IDR " />;
};

export default Number;

const styles = StyleSheet.create({});
