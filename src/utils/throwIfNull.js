import createHttpError from 'http-errors';

export const throwIfNull = (code, message) => (result) => {
  if (!result) throw createHttpError(code, message);
  return result;
};
