import { FastifyInstance } from "fastify";
import orgController from "./org.controller";
import { $ref } from "./org.schema";

async function orgRoutes(app: FastifyInstance) {
    app.post('/',
        {
            schema: {
                body: $ref('createOrgSchema'),
                response: {
                    201: $ref('createOrgResponseSchema')
                }
            }
        }, orgController.createHandler);

    app.get('/',
        {
            schema: {
                response: {
                    200: $ref('getAllOrgSchema')
                }
            }
        }, orgController.getAllHandler);

    app.get('/:organizationId',
        {
            schema: {
                response: {
                    200: $ref('getOrgSchema')
                }
            }
        }, orgController.getByIdHandler);

    app.put('/:organizationId',
        {
            schema: {
                body: $ref('updateOrgSchema'),
                response: {
                    200: $ref('updateOrgResponseSchema')
                }
            }
        }, orgController.updateHandler);

    app.delete('/:organizationId', { schema: { params: { id: { type: "number" } } } }, orgController.deleteHandler);
}

export default orgRoutes;
