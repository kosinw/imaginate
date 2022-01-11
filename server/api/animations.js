const express = require('express');
const Animation = require('../models/animation');

const router = express.Router();

// TODO(kosi): Add filtering options (query strings)
router.get("/", async (req, res) => {
  const animations = await Animation.find({});
  return res.status(200).json(animations);
});

router.get("/:animationId", async (req, res) => {
  const { animationId } = req.params;
  const animation = await Animation.findOne({ _id: animationId });
  return res.status(200).json(animation);
});

module.exports = router;