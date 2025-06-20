import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';

export default fp(async (fastify) => {
  // Security headers
  await fastify.register(helmet, {
    global: true,
    contentSecurityPolicy: false, // adjust as needed
  });

  // CORS configuration
  await fastify.register(cors, {
    origin: ['http://localhost:3000', 'https://your-frontend.com'],
    credentials: true,
  });

  // Rate Limit
  await fastify.register(rateLimit, {
    max: 100, // max requests per IP
    timeWindow: '1 minute',
    ban: 2, // consecutive violations before ban
  });
});
