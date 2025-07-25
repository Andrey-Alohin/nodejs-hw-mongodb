import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { logInUserSchema, registerUserSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  logInUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(logInUserSchema),
  ctrlWrapper(logInUserController),
);

export default router;
