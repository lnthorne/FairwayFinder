import { Document, Types } from "mongoose";
import { ISettings } from "./settings.type";

export interface IUser extends Document {
	_id: Types.ObjectId;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	profileImage?: string;
	settings: ISettings;
}
