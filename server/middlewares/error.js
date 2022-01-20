const Boom = require('@hapi/boom');

const errors = (err, req, res, next) => {
  // err.statusCode > 5xx
  // Log out server errors
  if (err.isServer) {
    console.error(err);
  }

  return res.set(err.headers).status(err.output.statusCode).json({
    error: {
      message: err.output.payload.message,
      type: err.output.payload.error.toUpperCase().replace(' ', '_'),
      statusCode: err.output.statusCode
    }
  });
};

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (!err.isBoom) {
      return next(Boom.badImplementation(err));
    }
    next(err);
  });
};

module.exports = { asyncMiddleware, errors };