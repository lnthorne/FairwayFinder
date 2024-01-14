import axios from 'axios';
import {CallAPI, Endpoint, METHOD} from './endpoints';
import {ICourseQueryParameters} from '@interfaces/course.type';

export async function GetCourses(params: ICourseQueryParameters) {
  console.log('PARAMS2', params);

  try {
    const response = await CallAPI({
      endpoint: '/idx',
      method: 'get',
    });

    console.log('Response from CallAPI:', response);
  } catch (error) {
    console.error('Error in CallAPI:', error);
  }

  //   try {
  //     const response = await axios({
  //       method: 'GET',
  //       baseURL: 'http://localhost:3000',
  //       url: '/idx',
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error('error in axios:', error);
  //   }

  //   try {
  //     const test2 = await axios.get('http://127.0.0.1:3000/idx');

  //     console.log('Response from Axios:', test2);
  //   } catch (error) {
  //     console.error('Error in Axios GET:', error);
  //   }
}
