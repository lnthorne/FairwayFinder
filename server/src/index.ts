import express, { json } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express, json());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
