import type { FastifyPluginAsync } from 'fastify';
import { createUserHandler } from './user.controller';
import { createUserSchema, createUserResponseSchema } from './user.schema';

const userRoutes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post(
    '/',
    {
      schema: {
        body: createUserSchema,
        response: { 201: createUserResponseSchema },
      },
    },
    createUserHandler,
  );
};

export default userRoutes;
