import {IUserLoginPayload} from '@interfaces/user.type';
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {Login} from '../utils/auth';
import {NavigationProp} from '@react-navigation/native';

interface ILoginProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<ILoginProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Implement login logic here
    console.log('Username:', username, 'Password:', password);
    const userData: IUserLoginPayload = {
      username,
      password,
    };
    try {
      const response = await Login(userData);

      if (response.error === null) {
        navigation.navigate('Home');
      }

      console.log('Response:', response);
    } catch (err) {
      console.error('Error sending login request', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
});

export default LoginScreen;
