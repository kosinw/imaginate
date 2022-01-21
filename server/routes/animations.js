const router = require("express").Router();
const AnimationsController = require("../controllers/animations");
const AuthMiddleware = require("../middlewares/auth");

// TODO(kosi): Add filtering options (query strings)
router.get("/", async (req, res) => {
  const animations = await AnimationsController.getAll();
  return res.status(200).json(animations);
});

router.post("/", AuthMiddleware.guard, async (req, res) => {
  const creator = req.user._id;
  const { title, framerate, resolution, frames, parent } = req.body;
  const animation = await AnimationsController.create({
    creator,
    framerate,
    resolution,
    title,
    frames,
    parent,
  });
  return res.status(201).json(animation);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const animation = await AnimationsController.get(id);
  return res.status(200).json(animation);
});

// TODO(kosi): Change this to require authentication and read the authenticated
// users infromation.
router.post("/:id", AuthMiddleware.guard, async (req, res) => {
  const { id } = req.params;
  const user = req.user._id;
  const { data } = req.body;
  const animation = await AnimationsController.insertFrame({ id, user, data });
  return res.status(201).json(animation);
});

router.post("/:id/upvote", AuthMiddleware.guard, async (req, res) => {
  const user = req.user._id;
  const { id } = req.params;
  const result = await AnimationsController.toggleUpvote({ user, id });
  return res.status(201).json(result);
});

module.exports = router;
