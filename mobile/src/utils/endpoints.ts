import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage';
import axios, {Method} from 'axios';

const baseURL = process.env.BASE_URL;

export enum Endpoint {
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  REGISTER = '/auth/register',
}

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
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
    const response = await axios({
      baseURL,
      url: endpoint,
      method,
      data,
      params,
      headers: token ? {Authorization: `Bearer ${token}`} : undefined,
    });

    return {data: response.data, error: null};
  } catch (error) {
    const apiError = error as APIError;
    console.error('Error calling API', apiError.response);

    return {
      data: null,
      error: apiError.response?.data || apiError.message,
    };
  }
}
