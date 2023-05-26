import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import main app

import { SignIn, SignUp, SignUpAdress, SplashScreen, SuccessSignUp } from '../pages';

// for fonts
const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
}

export default Router;
