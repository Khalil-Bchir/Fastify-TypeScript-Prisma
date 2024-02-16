import { FastifyReply, FastifyRequest } from "fastify";
import userService from "./user.service";
import { CreateUserInput, UpdateUserInput, updatedUserResponseSchema } from "./user.schema";

const userController = {
    registerHandler: async function (req: FastifyRequest<{ Body: CreateUserInput; }>, res: FastifyReply) {
        const body = req.body;

        try {
            const user = await userService.create(body);
            return res.code(201).send(user);
        } catch (e) {
            console.log(e);
            return res.code(500).send(e);
        }
    },

    getAllHandler: async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const users = await userService.getAll();
            return res.send(users);
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    getByIdHandler: async function (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
        try {
            const Id = Number(req.params.id);
            const user = await userService.getById(Id);

            if (!user) {
                return res.code(404).send({ error: "User not found" });
            }

            return res.send(user);
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    updateHandler: async function(req: FastifyRequest<{ Params: { id: number }; Body: UpdateUserInput }>, res: FastifyReply) {
        try {
            const Id = Number(req.params.id);
            const userData = req.body;

            const updatedUser = await userService.update(Id, userData);

            return res.send(updatedUserResponseSchema.parse(updatedUser));
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    deleteHandler: async function (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
        try {
            const Id = Number(req.params.id);
            const resultMessage = await userService.delete(Id);

            return res.send({ message: resultMessage });
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },
};

export default userController;
