import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGODB_URI!);
		console.log("MongoDB connected...");
	} catch (err) {
		console.error(`Error: ${(err as Error).message}`);
		// Exit process with failure
		process.exit(1);
	}
};

export default connectDB;
