import bcrypt from "bcrypt";
export const hashpass = async (pass: string) => {
  const saltRounds = 10;
  const create = await bcrypt.hash(pass, saltRounds);
  return create;
};
export const comapreHashpass = async (pass: string, hash: string) => {
  return bcrypt.compare(pass, hash);
};
