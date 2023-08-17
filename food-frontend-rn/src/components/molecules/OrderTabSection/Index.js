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

// hooks
import { useThunk } from '../../../hooks/use-thunk';

// thunk action
import { getInProgress, getPastOrders } from '../../../store';

import { useSelector } from 'react-redux';

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
  const { inProgress } = useSelector((state) => state.order);
  useEffect(() => {
    doGetOrders();
  }, []);
  return (
    <ScrollView>
      <View style={{ paddingTop: 8, paddingHorizontal: 24 }}>
        {inProgress.map((order) => {
          return <ItemListFood key={order.id} name={order.food.name} image={FoodDummy1} items={order.quantity} price={order.total} type="in-progress" onPress={() => navigation.navigate('OrderDetail')} />;
        })}
      </View>
    </ScrollView>
  );
};

const PastOrders = () => {
  const navigation = useNavigation();
  const [doGetOrders, isLoading, error] = useThunk(getPastOrders);
  const { pastOrders } = useSelector((state) => state.order);
  useEffect(() => {
    doGetOrders();
  }, []);
  return (
    <ScrollView>
      <View style={{ paddingTop: 8, paddingHorizontal: 24 }}>
        {pastOrders.map((order) => {
          return (
            <ItemListFood
              key={order.id}
              name={order.food.name}
              image={FoodDummy1}
              items={order.quantity}
              price={order.total}
              type="past-orders"
              date={order.created_at}
              status={order.status}
              onPress={() => navigation.navigate('OrderDetail')}
            />
          );
        })}
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
