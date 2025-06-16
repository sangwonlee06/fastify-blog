import { z } from 'zod';

export const userCore = {
  email: z
    .string({ required_error: 'Email is required', invalid_type_error: 'Email is not valid' })
    .email(),
  name: z.string().min(1, 'Name cannot be empty'),
};

export const createUserSchema = z.object({
  ...userCore,
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
});

export const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

export const getUserByIdParamsSchema = z.object({
  id: z.coerce.number().int(),
});

export const getUserByEmailParamsSchema = z.object({
  email: userCore.email,
});

export const getUserResponseSchema = createUserResponseSchema;
export const getUsersResponseSchema = z.array(createUserResponseSchema);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUserByIdParams = z.infer<typeof getUserByIdParamsSchema>;
export type GetUserByEmailParams = z.infer<typeof getUserByEmailParamsSchema>;
export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
