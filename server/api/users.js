const express = require("express");
const Users = require("../models/user.js");
const Animations = require("../models/animation");

const router = express.Router();

router.get("/:userId/animations", (req, res) => {
  const { userId } = req.params;
  Animations.find({ creator: userId }).then((animations) => {
    return res.status(200).json(animations);
  });
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  Users.findById(userId).then((user) => {
    return res.status(200).json(user);
  });
});

module.exports = router;
