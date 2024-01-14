import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {Logout} from '../utils/auth';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {GetCourses} from '../utils/api';

interface IHomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<IHomeProps> = ({navigation}) => {
  const [data, setData] = useState();
  // useEffect(() => {
  //   const test = async () => {
  //
  //   };

  //   test();
  // }, []);

  const handleCourseTest = async () => {
    const fuck = await GetCourses({
      radius: '20',
      lat: '33.448376',
      lng: '-112.074036',
    });

    console.warn(fuck.data.data.courses);
  };

  const handleLogout = async () => {
    try {
      const response = await Logout();

      if (response.error === null) {
        navigation.navigate('Login');
      }
      console.log(response);
    } catch (err) {
      console.error('Error logging out', err);
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Courses" onPress={handleCourseTest} />
    </View>
  );
};

export default HomeScreen;
