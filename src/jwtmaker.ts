import jwt from "jsonwebtoken";
import { SECRET } from "./secret";
export const jwtmaker = async (id: number) => {
  const key = jwt.sign({ id: id }, `${SECRET}`);
  return key;
};
