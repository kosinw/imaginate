const router = require('express').Router();

const AuthController = require('../controllers/auth');

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    return res.status(200).send({});
  }

  return res.status(200).send(req.user);
});


module.exports = router;