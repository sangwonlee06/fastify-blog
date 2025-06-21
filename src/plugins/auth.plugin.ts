import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import authRoutes from '../modules/auth/auth.route';
import { authenticateHook } from '../hooks/authenticate.hook';

export default fp(async (fastify) => {
  // 1) Cookie support
  await fastify.register(cookie);

  // 2) JWT support
  await fastify.register(fjwt, {
    secret: process.env.JWT_SECRET || 'default-secret',
    cookie: {
      cookieName: 'access_token',
      signed: false,
    },
  });

  // 3) Expose authenticate() hook decorator
  fastify.decorate('authenticate', authenticateHook);
});
