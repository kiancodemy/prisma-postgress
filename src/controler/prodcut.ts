import { Request, Response } from "express";
import { prisma } from "../index";
export const createProduct: any = async (req: Request, res: Response) => {
  try {
    const create = await prisma.product.create({
      data: {
        ...req.body,
        tag: req.body.join(","),
      },
    });
    res.status(201).json(create);
  } catch (err: any) {
    res.status(404).json({ mesage: err.message });
  }
};
export const deleteProduct: any = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await prisma.product.delete({
    where: {
      id: id,
    },
  });
  res.status(201).json({
    message: "deleted",
  });
};
export const updateProduct: any = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const update = await prisma.product.update({
      where: {
        id: id,
      },
      data: req.body,
    });
    res.status(201).json(update);
  } catch (err: any) {
    res.status(201).json({ message: err.message });
  }
};

export const getProduct: any = async (req: Request, res: Response) => {
  const find = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  });
  res.status(201).json(find);
};
