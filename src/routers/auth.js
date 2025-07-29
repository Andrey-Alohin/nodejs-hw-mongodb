import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  logInUserSchema,
  registerUserSchema,
  requestResetPasswordSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  logInUserController,
  logOutUserController,
  refreshUserSessionController,
  requestResetEmailController,
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

router.post(
  '/send-reset-email',
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post('/logout', ctrlWrapper(logOutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
