import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { FoodDummy2, FoodDummy3, FoodDummy4, ProfileDummy, FoodDummy1 } from '../../assets';

// components
import { FoodCard, Gap } from '../../components';

const Home = () => {
  return (
    <View>
      <View style={styles.profileContainer}>
        <View>
          <Text style={styles.appName}>FoodMarket</Text>
          <Text style={styles.desc}>Let's get some food</Text>
        </View>
        <Image source={ProfileDummy} style={styles.profile} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.foodCardContainer}>
          <Gap width={24} />
          <FoodCard image={FoodDummy1} />
          <FoodCard image={FoodDummy2} />
          <FoodCard image={FoodDummy3} />
          <FoodCard image={FoodDummy4} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  appName: {
    fontSize: 22,
    fontFamily: 'poppins-medium',
    color: '#020202',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'poppins-light',
    color: '#8D92A3',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  foodCardContainer: {
    flexDirection: 'row',
  },
});
