import { prisma } from '../../lib/prisma';
import { CreateUserInput } from './user.schema';
import { hashPassword } from '../../utils/hash';
import { User } from '@prisma/client';

export interface UserFilter {
  id?: number;
  email?: string;
  name?: string;
}

export const getUsers = async (filter: UserFilter = {}): Promise<User[]> => {
  return prisma.user.findMany({
    where: {
      id: filter.id,
      email: filter.email,
      name: filter.name,
    },
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

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

export const updateUser = async (
  id: number,
  data: Partial<Pick<User, 'email' | 'name'>>,
): Promise<User> =>
  prisma.user.update({
    where: { id },
    data,
  });

export const deleteUser = async (id: number): Promise<User> =>
  prisma.user.delete({ where: { id } });
