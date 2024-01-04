import { Request } from "express";
import { IUser } from "./user.type";

export interface IRequestWithUser extends Request {
	user: IUser; // Add the user property
}
