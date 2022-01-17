const router = require("express").Router();
const AnimationsController = require("../controllers/animations");

// TODO(kosi): Add filtering options (query strings)
router.get("/", async (req, res) => {
  const animations = await AnimationsController.getAll();
  return res.status(200).json(animations);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const animation = await AnimationsController.get(id);
  return res.status(200).json(animation);
});

router.post("/", async (req, res) => {
  const animationObj = {
    creator: req.user._id,
    title: req.body.title,
    frames: [],
    upvoters: [req.user._id],
  };
  const animation = await AnimationsController.createAnimation(animationObj);
  return res.status(201).json(animation);
});

router.post("/:animationId", async (req, res) => {
  const { animationId } = req.params;
  const frameObj = {
    user: req.user._id,
    data: req.body.data,
  };
  const animation = await AnimationsController.addFrame(animationId, frameObj);
  return res.status(201).json(animation);
});

module.exports = router;
