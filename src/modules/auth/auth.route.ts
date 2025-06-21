import type { FastifyPluginAsync } from 'fastify';
import { signInHandler } from './auth.controller';
import { signInSchema, signInResponseSchema } from './auth.schema';

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
};

export default authRoutes;
