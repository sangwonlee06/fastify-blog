import { prisma } from '../../lib/prisma';
import { CreateUserInput } from './user.schema';
import { hashPassword } from '../../utils/hash';

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
  });

  return user;
};
