import {
	ICourseDetails,
	ICourseDetailsQueryParameters,
	ICourseQueryParameters,
	ICoursesResponse,
} from "../typings/course.type";
import { Request, Response } from "express";
import { CallApi, Endpoint, METHOD } from "../util/golfambit.api";

export class GolfController {
	public async GetCourses(req: Request, res: Response): Promise<void> {
		console.error("Test:", req);
		try {
			const params = req.query as unknown as ICourseQueryParameters;

			const response = await CallApi({
				endpoint: Endpoint.COURSES,
				method: METHOD.GET,
				params,
			});

			if (response.error === null) {
				res.status(200).json(response);
				return;
			}

			res.status(404).json({ message: "Courses not found" });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Server error calling api" });
		}
	}

	public async getCourseDetails(req: Request, res: Response): Promise<void> {
		try {
			const params = req.query as unknown as ICourseDetailsQueryParameters;
			console.log(params);

			const response = await CallApi({
				endpoint: Endpoint.DETAILS,
				method: METHOD.GET,
				params,
			});

			if (response.error === null) {
				res.status(200).json(response);
				return;
			}

			res.status(404).json({ message: "Courses not found" });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Server error calling api" });
		}
	}
}
