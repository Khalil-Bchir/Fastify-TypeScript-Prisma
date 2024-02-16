import prisma from '../../utils/prisma';
import { InvitationStatus } from "@prisma/client";
import { SendInvitationInput } from "./userOrg.schema";

const userOrgService = {
    async sendInvitation(input: SendInvitationInput) {
        try {
            return await prisma.userOrganization.create({
                data: {
                    ...input,
                    invitationStatus: InvitationStatus.PENDING,
                },
            });
        } catch (error) {
            console.error("Error sending invitation:", error);
            throw new Error("Failed to send invitation");
        }
    },

    async acceptInvitation(userId: number, organizationId: number) {
        try {
            const existingUserOrg = await prisma.userOrganization.findUnique({
                where: {
                    userId_organizationId: {
                        userId,
                        organizationId,
                    },
                    invitationStatus: 'PENDING',
                },
            });

            if (!existingUserOrg) {
                throw new Error('Invitation not found or already accepted/declined.');
            }

            return await prisma.userOrganization.update({
                where: { userOrgId: existingUserOrg.userOrgId },
                data: { invitationStatus: 'ACCEPTED' },
            });
        } catch (error) {
            console.error("Error accepting invitation:", error);
            throw new Error("Failed to accept invitation");
        }
    },

    async declineInvitation(userId: number, organizationId: number) {
        try {
            const existingUserOrg = await prisma.userOrganization.findUnique({
                where: {
                    userId_organizationId: {
                        userId,
                        organizationId,
                    },
                    invitationStatus: 'PENDING',
                },
            });

            if (!existingUserOrg) {
                throw new Error('Invitation not found or already accepted/declined.');
            }

            return await prisma.userOrganization.update({
                where: { userOrgId: existingUserOrg.userOrgId },
                data: { invitationStatus: 'DECLINED' },
            });
        } catch (error) {
            console.error("Error declining invitation:", error);
            throw new Error("Failed to decline invitation");
        }
    },


};

export default userOrgService;
