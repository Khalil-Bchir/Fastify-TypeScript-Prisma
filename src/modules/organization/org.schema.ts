import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const orgCore = {
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
};

const createOrgSchema = z.object({
    ...orgCore,
});

const createOrgResponseSchema = z.object({
    ...orgCore,
    organizationId: z.number(),
});

const getOrgSchema = z.object({
    ...orgCore,
    organizationId: z.number(),
});

const getAllOrgSchema = z.array( getOrgSchema );

const updateOrgSchema = z.object({
    name: z.string().optional(),
});

const updateOrgResponseSchema = z.object({
    ...orgCore,
});

export type UpdateOrgInput = z.infer<typeof updateOrgSchema>;
export type CreateOrgInput = z.infer<typeof createOrgSchema>;

const models = {
    createOrgSchema,
    createOrgResponseSchema,
    getOrgSchema,
    getAllOrgSchema,
    updateOrgSchema,
    updateOrgResponseSchema,
}
export const { schemas: orgSchemas, $ref } = buildJsonSchemas(models, { $id : "OrgSchema" });
