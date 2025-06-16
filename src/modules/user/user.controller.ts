import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput } from './user.schema';
import { createUser } from './user.service';

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
