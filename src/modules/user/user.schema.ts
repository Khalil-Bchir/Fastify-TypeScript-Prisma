import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  username: z.string({
    required_error: "username is required",
    invalid_type_error: "username must be a string",
  }),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
})

const createUserResponseSchema = z.object({
  userId: z.number(),
  ...userCore,
});

const getUserSchema = z.object({
  userId: z.number(),
  ...userCore,
});

const getAllUsersSchema = z.array(
    getUserSchema
);

const updateUserSchema = z.object({
  ...userCore,
  email: userCore.email.optional(),
  username: userCore.username.optional(),
  password: z.string({
    required_error: 'Password must be a string',
    invalid_type_error: 'Password must be a string',
  }).optional(),
});

export const updatedUserResponseSchema = z.object({
  ...userCore
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type CreateUserInput = z.infer<typeof createUserSchema>;

const models = {
  createUserSchema,
  createUserResponseSchema,
  getUserSchema,
  getAllUsersSchema,
  updateUserSchema,
  updatedUserResponseSchema,
}
export const { schemas: userSchemas, $ref } = buildJsonSchemas(models, { $id : "UserSchema"});