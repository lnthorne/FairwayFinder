import {IUserLoginPayload, IUserRegisterPayload} from '@interfaces/user.type';
import {CallAPI, Endpoint, METHOD, TOKEN_STORAGE} from './endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Register(userData: IUserRegisterPayload) {
  const response = await CallAPI({
    endpoint: Endpoint.REGISTER,
    method: METHOD.POST,
    data: userData,
  });

  if (response.data && response.data.token) {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE, response.data.token);
    } catch (err) {
      console.log('Error storing token', err);
    }
  }

  return response;
}

export async function Login(userData: IUserLoginPayload) {
  const response = await CallAPI({
    endpoint: Endpoint.LOGIN,
    method: METHOD.POST,
    data: userData,
  });

  if (response.data && response.data.token) {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE, response.data.token);
    } catch (err) {
      console.log('Error storing token', err);
    }
  }

  return response;
}

export async function Logout() {
  const response = await CallAPI({
    endpoint: Endpoint.LOGOUT,
    method: METHOD.POST,
  });

  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  } catch (err) {
    console.log('Error removing token', err);
  }

  return response;
}
