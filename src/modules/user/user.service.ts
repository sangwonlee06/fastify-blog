import { prisma } from '../../lib/prisma';
import { CreateUserInput } from './user.schema';
import { hashPassword } from '../../utils/hash';
import { User } from '@prisma/client';

export const createUser = async (input: CreateUserInput): Promise<User> => {
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

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({});
  return users;
};
