import { z } from "zod";
import {buildJsonSchemas} from "fastify-zod";

const userOrgCore = {

    userId: z.number({
        required_error: "User Id is required",
        invalid_type_error: "User Id must be a number",
    }),

    organizationId: z.number({
        required_error: "Organization Id is required",
        invalid_type_error: "Organization Id must be a number",
    }),

    role: z.string({
        required_error: "Role is required",
        invalid_type_error: "Role must be a string",
    }),
    
};

const sendInvitationSchema = z.object({
    ...userOrgCore,
});

const sendInvitationResponseSchema = z.object({
    ...userOrgCore,
    invitationStatus: z.enum(["PENDING", "ACCEPTED", "DECLINED"], {
        required_error: "Invitation Status is required",
        invalid_type_error: "Invitation Status must be a valid enum value",
    }),
})

const invitationAnswer = z.object({
    userId: z.number({
        required_error: "User Id is required",
        invalid_type_error: "User Id must be a number",
    }),

    organizationId: z.number({
        required_error: "Organization Id is required",
        invalid_type_error: "Organization Id must be a number",
    }),
});

const invitationAnswerResponse = z.object({
    ...userOrgCore,
    invitationStatus: z.enum(["PENDING", "ACCEPTED", "DECLINED"], {
        required_error: "Invitation Status is required",
        invalid_type_error: "Invitation Status must be a valid enum value",
    }),
})

export type SendInvitationInput = z.infer<typeof sendInvitationSchema>;
export type InvitationAnswerInput = z.infer<typeof invitationAnswer>;

const models = {
    invitationAnswer,
    sendInvitationSchema,
    sendInvitationResponseSchema,
    invitationAnswerResponse,
}

export const { schemas: userOrgSchemas, $ref } = buildJsonSchemas(models, { $id: "UserOrgSchemas" });