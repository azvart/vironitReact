import express from 'express';
import {
    TokenVerification,
    Global,
    PostGlobal,
    GetConversationList,
    GetConversation,
    PostPrivateMessgae,
} from '../controllers/message.controllers';

const messageRouter = express.Router();

messageRouter.use(TokenVerification);

messageRouter
.get('/global',Global)
.post('/global',PostGlobal)
.get('/conversations',GetConversationList)
.get('/conversations/query',GetConversation)
.post('/private',PostPrivateMessgae)





export default messageRouter;