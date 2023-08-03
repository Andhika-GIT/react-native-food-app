import React, { useEffect } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4 } from '../../assets';

// components
import { FoodCard, Gap, HomeProfile, HomeTabSection } from '../../components';

// hooks
import { useThunk } from '../../hooks/use-thunk.js';

// redux
import { getFood } from '../../store/thunks/Home';
import { useSelector } from 'react-redux';

const Home = () => {
  const [doGetFood, isLoading, error] = useThunk(getFood);
  const { food } = useSelector((state) => state.home);

  useEffect(() => {
    doGetFood();
    console.log(food);
  }, [doGetFood]);

  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.foodCardContainer}>
            <Gap width={24} />
            {food.map((itemFood, index) => {
              return <FoodCard key={itemFood.id} rating={itemFood.rate} name={itemFood.name} image={FoodDummy1} />;
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.tabcontainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  foodCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabcontainer: {
    flex: 1,
  },
});
