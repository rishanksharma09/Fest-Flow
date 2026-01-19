import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

export const app = express();

app.use(cors())
app.use(cookieParser())

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));




app.use("/api/v1/user",userRouter)

app.use(errorHandler)


