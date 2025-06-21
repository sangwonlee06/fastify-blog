import { z } from 'zod';

// request body for sign-in
export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, 'Password is required'),
});

// response payload
export const signInResponseSchema = z.object({
  accessToken: z.string(),
});

export const signOutResponseSchema = z.object({ message: z.string() });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignInResponse = z.infer<typeof signInResponseSchema>;
export type SignOutResponse = z.infer<typeof signOutResponseSchema>;
