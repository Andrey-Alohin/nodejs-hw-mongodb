import {
  registerUser,
  logInUser,
  logOutUser,
  refreshUserSession,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { SESSION_COOKIES } from '../constants/authSessionCookies.js';
import { setupSession } from '../utils/setupSession.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const logInUserController = async (req, res) => {
  const session = await logInUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logOutUserController = async (req, res) => {
  if (req.cookies[SESSION_COOKIES.SESSION_ID]) {
    await logOutUser(req.cookies[SESSION_COOKIES.SESSION_ID]);
  }
  res.clearCookie(SESSION_COOKIES.REFRESH_TOKEN);
  res.clearCookie(SESSION_COOKIES.SESSION_ID);

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies[SESSION_COOKIES.SESSION_ID],
    refreshToken: req.cookies[SESSION_COOKIES.REFRESH_TOKEN],
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken({ email: req.body.email });
  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;
  await resetPassword({ token, password });

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
