import express from 'express';
import { signup, login, logout, health } from '../controllers/users.controller';
import validate from '../middleware/validator';
import { UserSignUp } from '../validators/user';
import { authMid } from '../middleware/auth';


const router = express.Router();
router.get('/health', authMid, health);
router.post('/api/v1/signup', validate(UserSignUp), signup);
router.post('/api/v1/login', validate(UserSignUp.pick({ email: true, password: true })), login);

export default router;