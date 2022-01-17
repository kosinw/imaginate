const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

const CLIENT_ID = "753689922635-os8bde4plqrgt60mt3bor7f5kumnjbti.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

class AuthController {
  // accepts a login token from the frontend, and verifies that it's legit
  static verify(token) {
    return client
      .verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      })
      .then((ticket) => ticket.getPayload());
  }

  // gets user from DB, or makes a new account if it doesn't exist yet
  static getOrCreateUser(user) {
    // the "sub" field means "subject", which is a unique identifier for each user
    return User.findOne({ googleid: user.sub }).then((existingUser) => {
      if (existingUser) return existingUser;

      const newUser = new User({
        name: user.name,
        googleid: user.sub,
      });

      return newUser.save();
    });
  }

  static login(req, res) {
    AuthController.verify(req.body.token)
      .then((user) => AuthController.getOrCreateUser(user))
      .then((user) => {
        // persist user in the session
        req.session.user = user;
        res.status(200).send(user);
      })
      .catch((err) => {
        console.log(`Failed to log in: ${err}`);
        res.status(401).send({ err });
      });
  }

  static logout(req, res) {
    req.session.user = null;
    return res.status(200).send({});
  }

  static populateCurrentUser(req, res, next) {
    // simply populate "req.user" for convenience
    req.user = req.session.user;
    next();
  }

  // Use this as a route middleware to ensure user is authenticated.
  static guard(req, res, next) {
    if (!req.user) {
      return res.status(401).send({ err: "not logged in" });
    }

    next();
  }
}

module.exports = AuthController;