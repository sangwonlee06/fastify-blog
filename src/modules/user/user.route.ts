import type { FastifyPluginAsync } from 'fastify';
import {
  createUserHandler,
  getUserByEmailHandler,
  getUserByIdHandler,
  getUsersHandler,
} from './user.controller';
import {
  createUserSchema,
  createUserResponseSchema,
  getUsersResponseSchema,
  getUserByIdParamsSchema,
  getUserResponseSchema,
  getUserByEmailParamsSchema,
  getUsersQuerySchema,
} from './user.schema';

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

  fastify.get(
    '/:id',
    {
      schema: {
        params: getUserByIdParamsSchema,
        response: { 200: getUserResponseSchema },
      },
    },
    getUserByIdHandler,
  );

  fastify.get(
    '/by-email/:email',
    {
      schema: {
        params: getUserByEmailParamsSchema,
        response: { 200: getUserResponseSchema },
      },
    },
    getUserByEmailHandler,
  );

  fastify.get(
    '/',
    {
      schema: {
        querystring: getUsersQuerySchema,
        response: { 200: getUsersResponseSchema },
      },
    },
    getUsersHandler,
  );
};

export default userRoutes;
