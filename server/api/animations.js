const express = require("express");
const Animation = require("../models/animation");

const router = express.Router();

// TODO(kosi): Add filtering options (query strings)
router.get("/", async (req, res) => {
  Animation.find({})
    .populate("creator")
    .then((animations) => {
      return res.status(200).json(animations);
    });
});

router.get("/:animationId", async (req, res) => {
  const { animationId } = req.params;
  Animation.findOne({ _id: animationId })
    .populate("creator")
    .then((animation) => {
      return res.status(200).json(animation);
    });
});

module.exports = router;
