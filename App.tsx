import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/components/SplashScreen/SplashScreen';
import Login from './src/components/Login/Login';
import EmployeeInfo from './src/components/EmployeeInfo/EmployeeInfo';
import HomeScreen from './src/components/Home/HomeScreen';
import UserProvider from './src/contexts/UserProvider';
import UserDetail from './src/components/UserDetail/UserDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EmployeeInfo"
          component={EmployeeInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
