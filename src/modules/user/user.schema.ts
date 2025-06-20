import { z } from 'zod';

/**
 * Core user fields used in multiple schemas
 */
export const userCore = {
  email: z
    .string({ required_error: 'Email is required', invalid_type_error: 'Email is not valid' })
    .email(),
  name: z.string().min(1, 'Name cannot be empty'),
};

/**
 * Schema for creating a user (request body)
 */
export const createUserSchema = z.object({
  ...userCore,
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
});

/**
 * Schema for the user object returned after creation
 * (omits password)
 */
export const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

/**
 * Querystring schema for GET /users?email=…&name=…&id=…
 */
export const getUsersQuerySchema = z.object({
  id: z.coerce.number().int().optional(),
  email: userCore.email.optional(),
  name: z.string().optional(),
});

/**
 * Params schema for GET /users/:id
 */
export const getUserByIdParamsSchema = z.object({
  id: z.coerce.number().int(),
});

/**
 * Params schema for GET /users/by-email/:email
 */
export const getUserByEmailParamsSchema = z.object({
  email: userCore.email,
});

/**
 * Schema for updating a user (request body)
 */
export const updateUserBodySchema = z
  .object({
    email: userCore.email.optional(),
    name: userCore.name.optional(),
  })
  .refine((data) => data.email !== undefined || data.name !== undefined, {
    message: 'At least one of email or name must be provided',
  });

/**
 * Single-user response schema (reuse createUserResponseSchema)
 */
export const getUserResponseSchema = createUserResponseSchema;

/**
 * Array-of-users response schema
 */
export const getUsersResponseSchema = z.array(createUserResponseSchema);

/**
 * Response schema for updating a user (200)
 */
export const updateUserResponseSchema = createUserResponseSchema;

/**
 * TypeScript types inferred from the Zod schemas
 */
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
export type GetUserByIdParams = z.infer<typeof getUserByIdParamsSchema>;
export type GetUserByEmailParams = z.infer<typeof getUserByEmailParamsSchema>;
export type UpdateUserInput = z.infer<typeof updateUserBodySchema>;
export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;
