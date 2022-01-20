const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

const { asyncMiddleware } = require('../middlewares/error');

router.get("/:id/animations", asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const animations = await UsersController.getAnimations(id);
  return res.status(200).json(animations);
}));

router.get("/:id", asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const user = await UsersController.get(id);
  return res.status(200).json(user);
}));

module.exports = router;
