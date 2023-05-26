import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import pages
import { SignIn, SignUp, SignUpAdress, SplashScreen, SuccessSignUp, Home, Order, Profile } from '../pages';

// bottom navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// for fonts
const Stack = createNativeStackNavigator();

// bottom navigator intialize
const Tab = createBottomTabNavigator();

// component utama ( setelah sign Up / Sign in )

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
  );
};

function Router() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpAdress" component={SignUpAdress} />
      <Stack.Screen name="SuccessSignUp" component={SuccessSignUp} />
      <Stack.Screen name="MainApp" component={MainApp} />
    </Stack.Navigator>
  );
}

export default Router;
