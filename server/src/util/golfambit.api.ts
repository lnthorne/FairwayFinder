import axios, { Method } from "axios";
import { ICourseDetailsQueryParameters, ICourseQueryParameters } from "../typings/course.type";
import "dotenv/config";

const baseURL = "https://golf-course-finder.p.rapidapi.com";

export enum Endpoint {
	COURSES = "/courses",
	DETAILS = "/course/details",
}

export enum METHOD {
	GET = "GET",
	POST = "POST",
	DELETE = "DELETE",
}

export interface APICallProps {
	endpoint: string;
	method: Method;
	params: ICourseQueryParameters | ICourseDetailsQueryParameters;
}

interface APIError {
	response?: {
		data?: any;
	};
	message?: string;
}

export async function CallApi({ endpoint, method = METHOD.GET, params }: APICallProps) {
	try {
		const response = await axios({
			baseURL,
			url: endpoint,
			method,
			params,
			headers: {
				"X-RapidAPI-Key": process.env.RAPID_API_KEY,
				"X-RapidAPI-Host": "golf-course-finder.p.rapidapi.com",
			},
		});

		return {
			data: response.data,
			error: null,
		};
	} catch (error) {
		const apiError = error as APIError;
		console.error("Error calling API from SERVER", apiError.response);
		return {
			data: null,
			error: apiError.response?.data || apiError.message,
		};
	}
}
