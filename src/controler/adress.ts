import { Response, Request } from "express";
import { prisma } from "../index";
export const createAdress: any = async (req: Request, res: Response) => {
  try {
    const create = await prisma.adress.create({
      data: {
        ...req.body,
        userid:+req.body.userid
      },
    });
    res.status(201).json(create);
  } catch (err: any) {
    res.status(401).json({
      message: err.message,
    });
  }
};
const updateAdress: any = (req: Request, res: Response) => {};
const deleteAdress: any = (req: Request, res: Response) => {};
