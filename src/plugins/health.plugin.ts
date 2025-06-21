import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  // Liveness & readiness probe
  fastify.get('/health', async () => {
    return {
      status: 'ok',
      uptime: process.uptime(), // seconds since process start
      timestamp: new Date().toISOString(),
    };
  });

  // DB check
  fastify.get('/health/db', async () => {
    await fastify.prisma.$queryRaw`SELECT 1`; // throws if DB is down
    return { status: 'ok', db: 'reachable' };
  });

  //  Redis check
  fastify.get('/health/redis', async () => {
    const pong = await fastify.redis.ping(); // returns 'PONG'
    return { status: 'ok', redis: pong };
  });
});
