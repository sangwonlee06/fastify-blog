import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateUserInput,
  GetUserByEmailParams,
  GetUserByIdParams,
  GetUserResponse,
  GetUsersQuery,
  GetUsersResponse,
} from './user.schema';
import { createUser, getUserByEmail, getUserById, getUsers } from './user.service';

export const createUserHandler = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply,
) => {
  try {
    const user = await createUser(request.body);
    return reply.status(201).send(user);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: 'Internal Server Error',
      error,
    });
  }
};

export const getUserByIdHandler = async (
  request: FastifyRequest<{ Params: GetUserByIdParams }>,
  reply: FastifyReply,
): Promise<GetUserResponse | void> => {
  const user = await getUserById(request.params.id);
  if (!user) {
    return reply.status(404).send({ message: 'User not found' });
  }
  return reply.send(user);
};

export const getUserByEmailHandler = async (
  request: FastifyRequest<{ Params: GetUserByEmailParams }>,
  reply: FastifyReply,
): Promise<GetUserResponse | void> => {
  const user = await getUserByEmail(request.params.email);
  if (!user) {
    return reply.status(404).send({ message: 'User not found' });
  }
  return reply.send(user);
};

export const getUsersHandler = async (
  request: FastifyRequest<{ Querystring: GetUsersQuery }>,
  reply: FastifyReply,
): Promise<GetUsersResponse> => {
  const users = await getUsers(request.query);
  return reply.code(200).send(users);
};
