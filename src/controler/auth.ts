import { Request, Response } from "express";
import { hashpass, comapreHashpass } from "../hashpassword";
import { jwtmaker } from "../jwtmaker";

import { prisma } from "../index";
export const signup:any = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("fill all the sections");
    }
    const find = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (find) {
      throw new Error("the email is already exist");
    }
    const hashedpassword = await hashpass(password);
    const create = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });
    res.status(201).json(create);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
export const login:any = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("fill all the sections");
    }
    const find = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        name: true,
        id: true,
        password: true,
      },
    });
    if (!find) {
      throw new Error("the user has not found ");
    }
    const compare = await comapreHashpass(password, find.password);
    if (compare && find) {
      const cookie = await jwtmaker(find.id);
      await res.cookie("jwt", cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      });
    } else {
      throw new Error("password is wrong ");
    }
    res.status(201).json({
      message: "sucessfull",
    });
  } catch (err: any) {
    res.status(404).json({
      message: err.message,
    });
  }
};
