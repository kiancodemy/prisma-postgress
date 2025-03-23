import express from "express";
import { port } from "./secret";
import router from "./router/auth";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma = new PrismaClient().$extends(withAccelerate());
const app = express();
app.use(express.json());

app.use("/auth", router);

app.listen(port, () => {
  console.log("it is connected");
});
