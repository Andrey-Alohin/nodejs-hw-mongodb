import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  logInUserSchema,
  registerUserSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  logInUserController,
  logOutUserController,
  requestResetEmailController,
  resetPasswordController,
  refreshUserSessionController,
  getUserInfoController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

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

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.get('/me', authenticate, ctrlWrapper(getUserInfoController));

router.post('/logout', ctrlWrapper(logOutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
