import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const ErrorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;
  console.log(message);

  if (!status) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }

  return res.status(status).json({ message });
};

export default ErrorMiddleware;
