export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  error.success = false;
  return error;
};

export const successHandler = (statusCode, message, data) => {
  const success = {
    statusCode: statusCode,
    message: message,
    success: true,
    data: data,
  };
  return success;
};
