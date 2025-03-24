import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new Error("please login");
    }
    const decoded = jwt.verify(token, `${process.env.SECRET}`) as any;

    const find = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!find) {
      throw new Error("user has not found ");
    }
    req.user = find;
    next();
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
