import express from "express";
import { GolfController } from "../../controllers/golf.controller";

const GolfService: GolfController = new GolfController();
const GolfRouter = express.Router();

GolfRouter.get("/courses", GolfService.GetCourses);
GolfRouter.get("/courses/details", GolfService.getCourseDetails);
GolfRouter.get("/test", (req, res) => {
	res.send("GET req received");
	console.log("Get request received");
});

export default GolfRouter;
