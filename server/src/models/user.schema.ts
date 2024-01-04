import mongoose, { Schema } from "mongoose";
import { IUser } from "../typings/user.type";

const UserSchema: Schema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	profileImage: { type: String, required: false },
	settings: {
		colour: { type: String, required: true, default: "Blue" }, // TODO: Create settings schema
	},
});

export const User = mongoose.model<IUser>("User", UserSchema);
