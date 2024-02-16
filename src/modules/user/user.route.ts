import { FastifyInstance } from "fastify";
import userController from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(app: FastifyInstance) {

    app.post('/',
        {
            schema: {
                body: $ref('createUserSchema'),
                response: {
                    201: $ref("createUserResponseSchema"),
                },
            },
        }, userController.registerHandler);

    app.get('/',
        {
            schema:{
                response:{
                    200: $ref("getAllUsersSchema")
                }
            }
        }, userController.getAllHandler);

    app.get('/:id',
        {
            schema:{
                response:{
                    200: $ref("getUserSchema")
                }
            }
        }, userController.getByIdHandler);

    app.put('/:id',
        {
            schema: {
                body: $ref('updateUserSchema'),
                response: {
                    201: $ref("updatedUserResponseSchema"),
                },
            },
        }, userController.updateHandler);

    app.delete("/:id", { schema: { params: { id: { type: "number" } } } },userController.deleteHandler);

}

export default userRoutes;