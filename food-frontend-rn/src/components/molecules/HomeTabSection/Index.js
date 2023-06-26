import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';

// react-native
import { useNavigation } from '@react-navigation/native';

// dummy
import { FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4 } from '../../../assets';

// react-native-tab-view
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// components
import Rating from '../Rating';
import ItemListFood from '../ItemListFood';

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
  return (
    <ScrollView>
      <View style={{ paddingTop: 8 }}>
        <ItemListFood image={FoodDummy1} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy2} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy3} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy4} onPress={() => navigation.navigate('FoodDetail')} />
      </View>
    </ScrollView>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ paddingTop: 8 }}>
        <ItemListFood image={FoodDummy4} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy3} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy2} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy1} onPress={() => navigation.navigate('FoodDetail')} />
      </View>
    </ScrollView>
  );
};

const Recommended = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ paddingTop: 8 }}>
        <ItemListFood image={FoodDummy3} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy2} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy1} onPress={() => navigation.navigate('FoodDetail')} />
        <ItemListFood image={FoodDummy4} onPress={() => navigation.navigate('FoodDetail')} />
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
