import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../typings/tokenPayload";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
	const token = req.header("Authorization")?.split("Bearer ")[1];

	if (!token) {
		return res.status(401).json({ message: "No token, authorization denied." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
		console.log("yes", decoded);
		req.user = decoded;

		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token." });
	}
}
