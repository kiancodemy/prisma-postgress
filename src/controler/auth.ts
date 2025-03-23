import { Request, Response } from "express";
import { prisma } from "../index";
const signup = async (req: Request, res: Response) => {
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
    const create = prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(create);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
const login = async (req: Request, res: Response) => {};
export { signup, login };
