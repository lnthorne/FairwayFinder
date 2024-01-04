import express from "express";
import { AuthController } from "../../controllers/auth.controller";

const authController: AuthController = new AuthController();
const AuthRouter = express.Router();

AuthRouter.post("/register", authController.register);

AuthRouter.post("/login", authController.login);

AuthRouter.post("/logout", authController.logout);

export default AuthRouter;
