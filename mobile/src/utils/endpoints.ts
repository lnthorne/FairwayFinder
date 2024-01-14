import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {Method} from 'axios';
// import {BASE_URL} from '@env';

const baseURL = 'http://localhost:3000';
const apiClient = axios.create({
  baseURL,
});

export enum Endpoint {
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  REGISTER = '/auth/register',
  COURSES = '/golf/courses',
  DETAILS = '/golf/courses/details',
}

export enum METHOD {
  GET = 'get',
  POST = 'post',
  DELETE = 'DELETE',
}

export const TOKEN_STORAGE = 'jwtToken';

export interface APICallProps {
  endpoint: Endpoint;
  method?: Method; // axios has its own type for HTTP methods
  data?: any;
  params?: Record<string, any>;
}

interface APIError {
  response?: {
    data?: any;
  };
  message?: string;
}

export async function CallAPI({
  endpoint,
  method = METHOD.GET,
  data = {},
  params = {},
}: APICallProps) {
  let token;
  try {
    token = await AsyncStorage.getItem(TOKEN_STORAGE);
  } catch (e) {
    console.error('Failed to fetch the token from storage:', e);
  }

  try {
    const response = await apiClient({
      method,
      url: endpoint,
      data: method === METHOD.GET ? undefined : data,
      params,
      headers: token ? {Authorization: `Bearer ${token}`} : undefined,
    });

    return {data: response.data, error: null};
  } catch (error) {
    const apiError = error as APIError;
    console.error('Error calling API', apiError);

    return {
      data: null,
      error: apiError.response?.data || apiError.message,
    };
  }
}
