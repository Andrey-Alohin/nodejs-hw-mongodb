import { registerUser, logInUser } from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const logInUserController = async (req, res, next) => {
  const user = await logInUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: user,
  });
};
