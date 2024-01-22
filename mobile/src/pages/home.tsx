import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Logout} from '../utils/auth';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import LocationComponent from './location.search';

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
    <View style={styles.view}>
      <LocationComponent navigation={navigation} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default HomeScreen;
