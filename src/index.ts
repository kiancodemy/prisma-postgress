import express from "express";

import dotenv from "dotenv";

import router from "./router/auth";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import cookieParser from "cookie-parser";
import prodcutrouter from "./router/prodcutRoute";
// Middleware to parse cookies
dotenv.config({ path: ".env" });
export const prisma = new PrismaClient().$extends(withAccelerate());

const app = express();
app.use(cookieParser());
app.use(express.json()); // for JSON payload
app.use(express.urlencoded({ extended: true }));

app.use("/auth", router);
app.use("/product", prodcutrouter);

app.listen(process.env.PORT, () => {
  console.log(`it is connected ${process.env.PORT}`);
});
