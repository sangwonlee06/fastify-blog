import Redis from 'ioredis';

declare global {
  // Prevent multiple Redis clients in dev with hot-reload
  // eslint-disable-next-line no-var
  var redisClient: Redis | undefined;
}

export const redis =
  globalThis.redisClient ??
  new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 5,
  });

// Cache the client in dev to avoid creating new connections on every reload
if (process.env.NODE_ENV !== 'production') {
  globalThis.redisClient = redis;
}
