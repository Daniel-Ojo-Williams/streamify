import { Router } from "express";
import { authMid } from "../middleware/auth";
import { addMessageToMeet, confirmMeet, createMeet, getMeetMessages } from "../controllers/meets.controller";
import validate from "../middleware/validator";
import { messageSchema } from "../validators/message";

const router = Router();

router.post('/api/v1/meet', authMid, createMeet)
router.get('/api/v1/messages/:meetId', authMid, getMeetMessages)
router.post('/api/v1/message', validate(messageSchema), authMid, addMessageToMeet);
router.get('/api/v1/meet/:meetId', authMid, confirmMeet);

export default router;
