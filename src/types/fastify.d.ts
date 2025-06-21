import type { JWT } from '@fastify/jwt';
import type { FastifyCookieOptions } from '@fastify/cookie';
import type { PrismaClient } from '../lib/prisma';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: any;
  }

  interface FastifyRequest {
    jwt: JWT;
    user: {
      id: number;
      email: string;
      name: string;
    };
    cookies: Record<string, string>; // from @fastify/cookie
  }

  interface FastifyReply {
    setCookie(name: string, value: string, options?: FastifyCookieOptions): void;
    clearCookie(name: string, options?: FastifyCookieOptions): void;
  }
}
