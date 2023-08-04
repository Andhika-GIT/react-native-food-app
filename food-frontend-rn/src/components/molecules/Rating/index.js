import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { IcStarOn, IcStarOff } from '../../../assets';
import Number from '../Number';

const Rating = ({ number }) => {
  const renderStar = () => {
    let star = [];
    for (let i = 1; i < 5; i++) {
      if (i <= number) {
        star.push(<IcStarOn />);
      } else {
        star.push(<IcStarOff />);
      }
    }
    return star;
  };
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.star}>{renderStar()}</View>
      <Number number={number} type="decimal" />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    flexDirection: 'row',
    marginRight: 4,
  },
});
