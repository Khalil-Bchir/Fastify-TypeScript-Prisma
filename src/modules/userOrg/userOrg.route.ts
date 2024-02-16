import { FastifyInstance } from "fastify";
import userOrgController from "./userOrg.controller";
import {$ref} from "./userOrg.schema";

async function userOrgRoute(app: FastifyInstance) {
    app.post('/send',{
        schema:{
            body: $ref('sendInvitationSchema'),
            response:{
                201: $ref('sendInvitationResponseSchema')
            }
        }
    }, userOrgController.sendInvitationHandler);

    app.post('/accept',{
        schema:{
            body: $ref('invitationAnswer'),
            response:{
                201: $ref('invitationAnswerResponse')
            }
        }
    }, userOrgController.acceptInvitationHandler);

    app.post('/decline',{
        schema:{
            body: $ref('invitationAnswer'),
            response:{
                201: $ref('invitationAnswerResponse')
            }
        }
    }, userOrgController.declineInvitationHandler);
}

export default userOrgRoute;