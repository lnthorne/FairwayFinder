import express from "express";
import { GolfController } from "../../controllers/golf.controller";

const GolfService: GolfController = new GolfController();
const GolfRouter = express.Router();

GolfRouter.get("/courses", GolfService.GetCourses);
GolfRouter.get("/courses/details", GolfService.getCourseDetails);

export default GolfRouter;
