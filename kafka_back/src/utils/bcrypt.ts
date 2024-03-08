import * as bcrypt from "bcrypt";

export const hash = async (plainText: string): Promise<string> => {
  const saltOrRounds = 10;
  let result = await bcrypt.hash(plainText, saltOrRounds)
  return result;
};

export const isHashValid = (password, hashPassword): Promise<boolean> => {
  let result = bcrypt.compare(password, hashPassword);
  return result;
};