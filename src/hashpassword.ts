import bcrypt from "bcrypt";
export const hashpass = async (pass: string) => {
  const saltRounds = 10;
  const create = await bcrypt.hash(pass, saltRounds);
  return create;
};
