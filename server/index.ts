import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";

//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

//routes
app.use("/api", routes.authRouter);
app.use("/api", routes.userRouter);
app.use("/api", routes.categoryRoute);
app.use("/api", routes.blogRouter);
app.use("/api", routes.commentRoute);

//database
import "./config/database";

//server listenning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server ligado na porta", PORT);
});
