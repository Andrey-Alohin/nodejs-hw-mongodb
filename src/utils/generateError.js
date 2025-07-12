import createHttpError from 'http-errors';

export const generateError = (code, message) => {
  const Code = code;
  const Message = message;

  return (res) => {
    if (!res) {
      throw createHttpError(Code, Message);
    }
  };
};
