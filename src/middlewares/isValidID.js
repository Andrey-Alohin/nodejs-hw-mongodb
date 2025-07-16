import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidID = (nameID) => (req, res, next) => {
  if (!isValidObjectId(req.params[nameID])) {
    throw createHttpError(400, 'ID is not valid');
  }
  next();
};
