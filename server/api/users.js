const express = require("express");
const Users = require("../models/user.js");

const router = express.Router();

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  Users.findById(userId).then((user) => {
    return res.status(200).json(user);
  });
});

module.exports = router;
