import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NumericFormat } from 'react-number-format';

const Number = ({ number, type, style }) => {
  if (type === 'decimal') {
    return <NumericFormat value={number} renderText={(value) => <Text style={style}>{value}</Text>} decimalSeparator="." displayType="text" decimalScale={1} fixedDecimalScale />;
  }

  return <NumericFormat value={number} thousandSeparator="." renderText={(value) => <Text style={style}>{value}</Text>} decimalSeparator="," displayType="text" prefix="IDR " />;
};

export default Number;

const styles = StyleSheet.create({});
