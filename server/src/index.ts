import express from "express";
import connectDB from "./database";
import AuthRouter from "./util/routers/auth.router";
import cors from "cors";
import { verifyToken } from "./util/token.auth";
import UserRouter from "./util/routers/user.router";
import GolfRouter from "./util/routers/golf.router";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/user", verifyToken, UserRouter);
app.use("/golf", GolfRouter);
app.get("/idx", (req, res) => {
	console.log("YEs from the index");
	res.send("Work from the index");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
