import { Request, Response } from "express";
import { User } from "../models/user.schema";
import { IUser } from "../typings/user.type";

export class UserController {
	public async GetUserById(req: Request, res: Response): Promise<void> {
		console.log(req.user);
		try {
			const userId = req.user!.id;
			const user: IUser | null = await User.findById(userId);

			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}

			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ message: "Error fetching user", error });
		}
	}
}
