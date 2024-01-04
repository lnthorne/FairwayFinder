import React from 'react';
import {Button, Text, View} from 'react-native';
import {Logout} from '../utils/auth';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface IHomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<IHomeProps> = ({navigation}) => {
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
    </View>
  );
};

export default HomeScreen;
