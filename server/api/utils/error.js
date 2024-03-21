export const errorHandler = (statuCode, message) => {
  const error = new Error();
  error.statuCode = statuCode;
  error.message = message;
  return error;
};
