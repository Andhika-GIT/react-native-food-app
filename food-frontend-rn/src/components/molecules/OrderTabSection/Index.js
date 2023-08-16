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

import { useThunk } from '../../../hooks/use-thunk';

import { getInProgress } from '../../../store';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#020202', height: 3, width: '0.1%' }}
    style={{ backgroundColor: 'white', elevation: 0, shadowOpacity: 0, borderBottomColor: '#F2F2F2', borderBottomWidth: 1 }}
    tabStyle={{ width: 'auto' }}
    renderLabel={({ route, focused, color }) => <Text style={{ fontFamily: 'poppins-medium', color: focused ? '#020202' : '#8D92A3' }}>{route.title}</Text>}
  />
);

const InProgress = () => {
  const navigation = useNavigation();
  const [doGetOrders, isLoading, error] = useThunk(getInProgress);
  useEffect(() => {
    doGetOrders();
  }, []);
  return (
    <ScrollView>
      <View style={{ paddingTop: 8, paddingHorizontal: 24 }}>
        <ItemListFood name="Soup Bumil" image={FoodDummy1} items={3} price="2.000.000" type="in-progress" onPress={() => navigation.navigate('OrderDetail')} />
      </View>
    </ScrollView>
  );
};

const PastOrders = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ paddingTop: 8, paddingHorizontal: 24 }}>
        <ItemListFood name="Soup Bumil" image={FoodDummy1} items={3} price="2.000.000" type="past-orders" date="Jun 12, 14:00" status="Cancel" onPress={() => navigation.navigate('OrderDetail')} />
        <ItemListFood name="Soup Bumil" image={FoodDummy1} items={3} price="2.000.000" type="past-orders" date="Jun 12, 14:00" onPress={() => navigation.navigate('OrderDetail')} />
      </View>
    </ScrollView>
  );
};

const renderScene = SceneMap({
  1: InProgress,
  2: PastOrders,
});

const OrderTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: '1', title: 'In Progress' },
    { key: '2', title: 'Past Orders' },
  ]);

  return <TabView renderTabBar={renderTabBar} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={{ width: layout.width }} style={{ backgroundColor: 'white' }} />;
};

export default OrderTabSection;

const styles = StyleSheet.create({});
