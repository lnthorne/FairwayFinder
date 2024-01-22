export interface ICoursesResponse {
	courses: ICourse[];
}

export interface ICourse {
	id: string;
	name: string;
	zip_code: string;
	distance: number;
}

export interface ICourseDetails {
	result: ICourseResults;
	status: string;
}

export interface ICourseResults {
	formatted_address: string;
	formatted_phone_number: string;
	name: string;
	photos: Object[];
	rating: number;
	url: string;
	website: string;
	opening_hours: {
		open_now: boolean;
		weekday_text: string[];
		periods: object[];
	};
}

export interface ICourseQueryParameters {
	radius: string;
	lat: string;
	lng: string;
}

export interface ICourseDetailsQueryParameters {
	zip: string;
	name: string;
}
