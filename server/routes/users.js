const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

router.get("/:id/animations", async (req, res) => {
  const { id } = req.params;
  return res.status(200).json(await UsersController.getAnimations(id));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  return res.status(200).json(await UsersController.get(id))
});

module.exports = router;
