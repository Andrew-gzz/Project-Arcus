import logger from '../utils/logger.js';

export const notFoundHandler = (req, res, next) => {
  res.status(404);
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  logger.error(
    `[${req.method} ${req.originalUrl}] ${err.message}`,
    {
      statusCode,
      stack: err.stack,
      body: req.body,
      params: req.params,
      query: req.query,
    }
  );

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
