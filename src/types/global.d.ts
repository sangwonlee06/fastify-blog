// NodeJS “process.env” typing
import { PrismaClient } from '@prisma/client';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    // add any other env vars
  }
}

// JWT payload extension
type UserPayload = {
  id: number;
  email: string;
  name: string;
};

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload;
  }
}

declare global {
  // e.g. prisma singleton for scripts/tests
  var prisma: PrismaClient | undefined;
}

// Allow importing JSON
declare module '*.json' {
  const value: any;
  export default value;
}
