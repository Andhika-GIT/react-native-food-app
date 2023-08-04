import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

// icons
import { IcBack } from '../../../assets';

const Header = ({ title, subTitle, onBack }) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
          <View style={styles.back}>
            <IcBack />
          </View>
        </TouchableOpacity>
      )}

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'poppins-medium',
    color: '#020202',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'poppins-light',
    color: '#8092A3',
  },
  back: {
    padding: 16,
    marginRight: 16,
    marginLeft: -16,
  },
});
