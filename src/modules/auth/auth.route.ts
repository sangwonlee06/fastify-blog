import type { FastifyPluginAsync } from 'fastify';
import { signInHandler, signOutHandler } from './auth.controller';
import { signInSchema, signInResponseSchema, signOutResponseSchema } from './auth.schema';

const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    '/signin',
    {
      schema: {
        body: signInSchema,
        response: { 200: signInResponseSchema },
      },
    },
    signInHandler,
  );

  fastify.post(
    '/signout',
    {
      schema: {
        response: {
          200: signOutResponseSchema,
        },
      },
    },
    signOutHandler,
  );
};

export default authRoutes;
