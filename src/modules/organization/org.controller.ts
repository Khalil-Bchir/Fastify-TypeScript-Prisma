import { FastifyReply, FastifyRequest } from "fastify";
import orgService from "./org.service";
import  {CreateOrgInput, UpdateOrgInput} from "./org.schema";
import {number} from "zod";

const orgController = {
    createHandler: async function (req: FastifyRequest<{ Body: CreateOrgInput }>, res: FastifyReply){
        const body= req.body;
        try{
            const org = await orgService.create(body);
            return res.code(201).send(org);
        }catch (e) {
            console.log(e);
            return res.code(500).send(e);
        }

    },

    getAllHandler: async function (_req: FastifyRequest, res: FastifyReply){
        try {
            const orgs = await orgService.getAll();
            return res.send(orgs);
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    getByIdHandler: async function (req: FastifyRequest<{ Params: { organizationId: number } }>, res: FastifyReply){
        const organizationId = Number(req.params.organizationId);
        try {
            const org = await orgService.getById(organizationId);
            if (!org) {
                return res.code(404).send({ error: 'Organization not found' });
            }
            return res.send(org);
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    updateHandler: async function (req: FastifyRequest<{ Params: { organizationId: number }; Body: UpdateOrgInput }>, res: FastifyReply){
        const organizationId = Number(req.params.organizationId);
        const data = req.body;
        try {
            const updatedOrg = await orgService.update(organizationId, data);
            return res.send(updatedOrg);
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    deleteHandler: async function (req: FastifyRequest<{ Params: { organizationId: number } }>, res: FastifyReply){
        const organizationId = Number(req.params.organizationId);
        try {
            const deletedOrg = await orgService.delete(organizationId);
            if (!deletedOrg) {
                return res.code(404).send({ error: 'Organization not found' });
            }
            return res.send({ message: `Organization with ID ${organizationId} was deleted successfully` });
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },
};

export default orgController;
