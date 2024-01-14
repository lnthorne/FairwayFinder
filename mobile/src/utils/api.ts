import {CallAPI, Endpoint, METHOD} from './endpoints';
import {
  ICourseDetailsQueryParameters,
  ICourseQueryParameters,
} from '@interfaces/course.type';

export async function GetCourses(params: ICourseQueryParameters) {
  const response = await CallAPI({
    endpoint: Endpoint.COURSES,
    method: METHOD.GET,
    params,
  });

  if (response.error !== null) {
    console.error(response.error);
    return {data: null, error: response.error};
  }

  return response.data;
}

export async function getCourseDetails(params: ICourseDetailsQueryParameters) {
  const response = await CallAPI({
    endpoint: Endpoint.DETAILS,
    method: METHOD.GET,
    params,
  });

  if (response.error !== null) {
    console.error(response.error);
    return {data: null, error: response.error};
  }

  return response.data;
}
