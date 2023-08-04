import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FoodDummy6, IcBackWhite } from '../../assets';

// components
import { Rating, Button, Counter, Number } from '../../components';

// UTILS
import { getData } from '../../utils';

const FoodDetail = ({ navigation, route }) => {
  // mengambil data food dari parameter navigation
  const { name, description, ingredients, rate, price } = route.params;

  // untuk price
  const [totalItem, setTotalItem] = useState(1);

  // untuk profile
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getData('userProfile').then((response) => {
      setUserProfile(response);
    });
  }, []);

  // ketika counter berubah
  const onCounterChange = (value) => {
    setTotalItem(value);
  };

  // data yang dikirimkan ke halaman payment
  const onOrder = () => {
    const totalPrice = totalItem * price;
    const driver = 50000;
    const tax = (10 / 100) * totalPrice;
    const total = totalPrice + driver + tax;

    const data = {
      item: {
        name: name,
        price: price,
        picturePath: FoodDummy6,
      },
      transactions: {
        totalItem: totalItem,
        totalPrice: totalPrice,
        driver: driver,
        tax: tax,
        total: total,
      },
      userProfile,
    };

    console.log(data);
    navigation.navigate('OrderSummary', data);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground source={FoodDummy6} style={styles.cover}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <IcBackWhite />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.productContainer}>
              <View>
                <Text style={styles.title}>{name}</Text>
                <Rating number={rate} />
              </View>
              <Counter onValueChange={onCounterChange} />
            </View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.label}>Ingredients:</Text>
            <Text style={styles.description}>{ingredients}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Number number={totalItem * price} style={styles.priceTotal} />
            </View>
            <View style={styles.button}>
              <Button text="Order now" onPress={onOrder} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  container: { flex: 1 },
  cover: { height: 330, paddingTop: 40, paddingLeft: 22 },
  back: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -20,
    paddingTop: 26,
    paddingHorizontal: 16,
  },
  mainContent: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontFamily: 'poppins-reguler',
    color: '#020202',
  },
  description: {
    fontSize: 14,
    fontFamily: 'poppins-reguler',
    color: '#8D92A3',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'poppins-reguler',
    color: '#020202',
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 13,
    fontFamily: 'poppins-reguler',
    color: '#8D92A3',
  },
  priceTotal: {
    fontSize: 18,
    fontFamily: 'poppins-reguler',
    color: '#020202',
  },
  button: {
    width: 163,
  },
});
