import { prisma } from '../../lib/prisma';
import { verifyPassword } from '../../utils/hash';
import type { User } from '@prisma/client';

/**
 * Throws if credentials are invalid.
 * Otherwise, returns the matched User record.
 */
export async function authenticateUser(email: string, password: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const ok = await verifyPassword(password, user.password);
  if (!ok) {
    throw new Error('Invalid credentials');
  }
  return user;
}
