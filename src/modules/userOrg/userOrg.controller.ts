import { FastifyReply, FastifyRequest } from "fastify";
import userOrgService from "./userOrg.service";
import {InvitationAnswerInput, SendInvitationInput} from "./userOrg.schema";
import userService from "../user/user.service";
import orgService from "../organization/org.service";

const userOrgController = {
    sendInvitationHandler: async function (req: FastifyRequest<{ Body: SendInvitationInput }>, res: FastifyReply) {
        try {
            const { userId, organizationId, role } = req.body;

            // Check if user exists
            const user = await userService.getById(userId);
            if (!user) {
                return res.status(404).send({ error: "User not found" });
            }

            // Check if organization exists
            const organization = await orgService.getById(organizationId);
            if (!organization) {
                return res.status(404).send({ error: "Organization not found" });
            }

            const result = await userOrgService.sendInvitation(req.body);
            res.send(result);
        } catch (e) {
            console.error("Error sending invitation:", e);
            res.status(500).send(e);
        }
    },

    acceptInvitationHandler: async function (req: FastifyRequest<{ Body: InvitationAnswerInput }>, res: FastifyReply) {
        try {
            const { userId, organizationId } = req.body;
            const result = await userOrgService.acceptInvitation(userId, organizationId);
            res.send(result);
        } catch (error) {
            console.error("Error accepting invitation:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    declineInvitationHandler: async function (req: FastifyRequest<{ Body: InvitationAnswerInput }>, res: FastifyReply) {
        try {
            const { userId, organizationId } = req.body;
            const result = await userOrgService.declineInvitation(userId, organizationId);
            res.send(result);
        } catch (error) {
            console.error("Error declining invitation:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },
};

export default userOrgController;