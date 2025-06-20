import type { FastifyPluginAsync } from 'fastify';
import {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  getUserByEmailHandler,
  updateUserHandler,
  deleteUserHandler,
} from './user.controller';
import {
  createUserSchema,
  createUserResponseSchema,
  getUsersQuerySchema,
  getUsersResponseSchema,
  getUserByIdParamsSchema,
  getUserResponseSchema,
  getUserByEmailParamsSchema,
  updateUserBodySchema,
  updateUserResponseSchema,
} from './user.schema';

const userRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /users (with optional ?id,?email,?name filters)
  fastify.get(
    '/',
    { schema: { querystring: getUsersQuerySchema, response: { 200: getUsersResponseSchema } } },
    getUsersHandler,
  );

  // GET /users/:id
  fastify.get(
    '/:id',
    { schema: { params: getUserByIdParamsSchema, response: { 200: getUserResponseSchema } } },
    getUserByIdHandler,
  );

  // GET /users/by-email/:email
  fastify.get(
    '/by-email/:email',
    { schema: { params: getUserByEmailParamsSchema, response: { 200: getUserResponseSchema } } },
    getUserByEmailHandler,
  );
  // POST /users
  fastify.post(
    '/',
    { schema: { body: createUserSchema, response: { 201: createUserResponseSchema } } },
    createUserHandler,
  );

  // PUT /users/:id
  fastify.put(
    '/:id',
    {
      schema: {
        params: getUserByIdParamsSchema,
        body: updateUserBodySchema,
        response: { 200: updateUserResponseSchema },
      },
    },
    updateUserHandler,
  );

  // DELETE /users/:id
  fastify.delete('/:id', { schema: { params: getUserByIdParamsSchema } }, deleteUserHandler);
};

export default userRoutes;
