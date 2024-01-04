import { UserPayload } from "../tokenPayload";

declare global {
	namespace Express {
		export interface Request {
			user?: UserPayload;
		}
	}
}
