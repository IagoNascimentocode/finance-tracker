import express, { NextFunction, Request, Response } from "express";
// import AppDataSource from "./database/data-source";
import "reflect-metadata";
import cors from "cors";
import * as dotenv from "dotenv";
import { router } from "./router";
import { AppError } from "./utils/AppError";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());
// AppDataSource.initialize().then(() => {
//   console.log("Database connected");
// })

app.use(router)

// @ts-ignore
app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {

  if (err instanceof AppError) {
    return response.status(err.status).json({ status: err.status, message: err.message })
  }
  console.log(err)
  return response.status(500).json({ status: "error", message: "Internal Server Error" })

})
app.listen(3000, () => console.log("Server is running"));