import { FastifyRequest, FastifyReply } from 'fastify';
import { UserPayload } from '../types/global';

export async function authenticateHook(request: FastifyRequest, reply: FastifyReply) {
  const token = request.cookies.access_token;
  if (!token) {
    return reply.status(401).send({ message: 'Authentication required.' });
  }
  try {
    const user = request.jwt.verify<UserPayload>(token);
    request.user = user;
  } catch (err) {
    return reply.status(401).send({ message: 'Invalid token.' });
  }
}
