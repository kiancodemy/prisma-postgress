import { Response, Request, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { prisma } from "../index";
export const adminauth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new Error("please login");
    }
    const decoded = (await jwt.verify(token, `${process.env.SECRET}`)) as any;

    const find = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!find) {
      throw new Error("user has not found ");
    }

    if (find && find.role == "ADMIN") {
      req.user = find;
      next();
    } else {
      throw new Error("you are not admin");
    }
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
