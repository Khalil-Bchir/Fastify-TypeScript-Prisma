import prisma from '../../utils/prisma';
import {CreateOrgInput, UpdateOrgInput} from './org.schema';

const orgService = {
        async create(input: CreateOrgInput) {
            try {
                return await prisma.organization.create({
                    data: {
                        name: input.name,
                    },
                });
            } catch (error) {
                console.error('Error creating organization:', error);
                throw error;
            }
        },

        async getAll() {
            try {
                return await prisma.organization.findMany({
                    select: {
                        name: true,
                        organizationId: true,
                    },
                });
            } catch (error) {
                console.error('Error retrieving organizations:', error);
                throw error;
            }
        },

        async getById(organizationId: number) {
            try {
                return await prisma.organization.findUnique({
                    where: {
                        organizationId,
                    },
                    select: {
                        name: true,
                        organizationId: true,
                    },
                });
            } catch (error) {
                console.error(`Error retrieving organization with ID ${organizationId}:`, error);
                throw error;
            }
        },

        async update(organizationId: number, data: UpdateOrgInput) {
            try {
                return await prisma.organization.update({
                    where: {organizationId},
                    data: {
                        name: data.name,
                    },
                });
            } catch (error) {
                console.error(`Error updating organization with ID ${organizationId}:`, error);
                throw error;
            }
        },

        async delete(organizationId: number) {
            try {
                return await prisma.organization.delete({
                    where: {
                        organizationId,
                    },
                });
            } catch (error) {
                console.error(`Error deleting organization with ID ${organizationId}:`, error);
                throw error;
            }
        },
};
export default orgService;