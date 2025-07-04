import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SignInInput, SignInResponse, SignOutResponse } from './auth.schema';
import { authenticateUser } from './auth.service';

/**
 * Verify credentials, issue JWT, set cookie, and return token.
 */
export const signInHandler = async (
  request: FastifyRequest<{ Body: SignInInput }>,
  reply: FastifyReply,
): Promise<SignInResponse> => {
  const { email, password } = request.body;

  // Verify user/password
  const user = await authenticateUser(email, password);

  // Sign a JWT (expires in 1 hour)
  const token = await reply.jwtSign({ userId: user.id }, { expiresIn: '1h' });

  // Set it as an HTTP-only cookie
  reply.setCookie('access_token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });

  // Return the access token in the response body
  return reply.send({ accessToken: token });
};

/**
 * Clears the access_token cookie and returns a confirmation message.
 */
export const signOutHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<SignOutResponse> => {
  // Clear the access token cookie
  reply.clearCookie('access_token', { path: '/' });

  // Return a 200 OK with a JSON confirmation
  return reply.code(200).send({ message: 'Signed out successfully' });
};
