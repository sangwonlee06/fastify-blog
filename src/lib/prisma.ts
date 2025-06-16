import { PrismaClient } from '@prisma/client';

declare global {
  // allow global caching in dev to prevent hot-reload issues
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ['query', 'warn'],
  });

// only cache in non-prod to avoid exhausting your connection pool
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}