const router = require('express').Router();
const Animation = require('../models/animation');
const Frame = require('../models/frame');
const User = require('../models/user');

// TODO(kosi): Add filtering options (query strings)
router.get("/", async (req, res) => {
  const animations = await Animation.find({})
    .lean()
    .populate({
      path: "creator",
      model: User,
      select: "name"
    })
    .populate({
      path: "frames",
      model: Frame,
      select: "data",
    });

  return res.status(200).json(animations);
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
