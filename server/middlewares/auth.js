const Boom = require('@hapi/boom');

const admin = require('../firebase');
const User = require('../models/user');

class AuthMiddleware {
  static _getOrCreateUser(token) {
    // the "sub" field means "subject", which is a unique identifier for each user
    return User.findOne({ googleid: token.uid }).then((existingUser) => {
      if (existingUser) return existingUser;

      const newUser = new User({
        name: token.name,
        googleid: token.uid,
      });

      return newUser.save();
    });
  }

  static async populate(req, res, next) {
    const authHeader = req.header("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const idToken = authHeader.split('Bearer ')[1];

      try {
        const authToken = await admin.auth().verifyIdToken(idToken);
        req.user = await AuthMiddleware._getOrCreateUser(authToken);
      } catch (err) {
        console.log(err);
      }
    }

    next();
  }

  static guard(req, res, next) {
    if (!req.user) {
      next(Boom.unauthorized("Token authentication required. Include `Authorization` header with request."));
    }

    next()
  }
}

module.exports = AuthMiddleware;