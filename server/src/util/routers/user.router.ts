import express from "express";
import { UserController } from "../../controllers/user.controller";

const UserService: UserController = new UserController();
const UserRouter = express.Router();

UserRouter.get("/", UserService.GetUserById);

// UserRouter.put("/", UserService.UpdateUser);

// UserRouter.delete("/", UserService.DeleteUser);

export default UserRouter;
