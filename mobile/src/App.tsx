import React from 'react';
import LoginScreen from './pages/login'; // Adjust the import path as needed
import RegisterScreen from './pages/register';
import HomeScreen from './pages/home';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './utils/types/naviagtion.types';
import 'react-native-screens';
import CourseDetails from './pages/course.detail';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerLeft: () => null,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CourseDetails" component={CourseDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
