import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

// react-native
import { useNavigation } from '@react-navigation/native';

// dummy
import { FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4 } from '../../../assets';

// react-native-tab-view
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// components
import Rating from '../Rating';
import ItemListFood from '../ItemListFood';

// redux
import { useSelector } from 'react-redux';
import { getFoodDataByTypes } from '../../../store';

// custon hooks
import { useThunk } from '../../../hooks/use-thunk';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#020202', height: 3, width: '0.1%' }}
    style={{ backgroundColor: 'white', elevation: 0, shadowOpacity: 0, borderBottomColor: '#F2F2F2', borderBottomWidth: 1 }}
    tabStyle={{ width: 'auto' }}
    renderLabel={({ route, focused, color }) => <Text style={{ fontFamily: 'poppins-medium', color: focused ? '#020202' : '#8D92A3' }}>{route.title}</Text>}
  />
);

const NewTaste = () => {
  const navigation = useNavigation();
  const { newTaste } = useSelector((state) => state.home);
  const [getFoodTypes, isLoading, error] = useThunk(getFoodDataByTypes);

  useEffect(() => {
    getFoodTypes('new_food');
  }, []);
  return (
    <ScrollView>
      <View style={{ paddingTop: 8, paddingHorizontal: 24 }}>
        {newTaste.map((item) => {
          return <ItemListFood key={item.id} type="product" name={item.name} price={item.price} rating={item.rate} image={FoodDummy1} onPress={() => navigation.navigate('FoodDetail')} />;
        })}
      </View>
    </ScrollView>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  const { popular } = useSelector((state) => state.home);
  const [getFoodTypes, isLoading, error] = useThunk(getFoodDataByTypes);

  useEffect(() => {
    getFoodTypes('popular');
  }, []);
  return (
    <ScrollView>
      <View style={{ paddingTop: 8, paddingHorizontal: 24 }}>
        {popular.map((item) => {
          return <ItemListFood key={item.id} type="product" name={item.name} price={item.price} rating={item.rate} image={FoodDummy1} onPress={() => navigation.navigate('FoodDetail')} />;
        })}
      </View>
    </ScrollView>
  );
};

const Recommended = () => {
  const navigation = useNavigation();
  const { recommended } = useSelector((state) => state.home);
  const [getFoodTypes, isLoading, error] = useThunk(getFoodDataByTypes);

  useEffect(() => {
    getFoodTypes('recommended');
  }, []);
  return (
    <ScrollView>
      <View style={{ paddingTop: 8, paddingHorizontal: 24 }}>
        {recommended.map((item) => {
          return <ItemListFood key={item.id} type="product" name={item.name} price={item.price} rating={item.rate} image={FoodDummy1} onPress={() => navigation.navigate('FoodDetail')} />;
        })}
      </View>
    </ScrollView>
  );
};

const renderScene = SceneMap({
  1: NewTaste,
  2: Popular,
  3: Recommended,
});

const HomeTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: '1', title: 'New Taste' },
    { key: '2', title: 'Popular' },
    { key: '3', title: 'Recommended' },
  ]);

  return <TabView renderTabBar={renderTabBar} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={{ width: layout.width }} style={{ backgroundColor: 'white' }} />;
};

export default HomeTabSection;

const styles = StyleSheet.create({});
