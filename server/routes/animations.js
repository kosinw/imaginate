const router = require("express").Router();
const AnimationsController = require("../controllers/animations");
const AuthMiddleware = require("../middlewares/auth");
const { asyncMiddleware } = require("../middlewares/error");
const paginate = require("../utils/paginate");

router.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    let animations = {};
    if (req.query.order === "score" && !req.query.search) {
      animations = await AnimationsController.getAllByScoreDescending();
    } else if (req.query.order === "latest" && !req.query.search) {
      animations = await AnimationsController.getAllByLatest();
    } else if (req.query.order === "score" && req.query.search) {
      animations = await AnimationsController.getSearchByScoreDescending(req.query.search);
    } else if (req.query.order === "latest" && req.query.search) {
      animations = await AnimationsController.getSearchByLatest(req.query.search);
    } else if (req.query.search) {
      animations = await AnimationsController.getSearch(req.query.search);
    } else {
      animations = await AnimationsController.getAll();
    }

    animations = paginate(req.query, animations, 12);

    return res.status(200).json(animations);
  })
);

router.post(
  "/",
  AuthMiddleware.guard,
  asyncMiddleware(async (req, res, next) => {
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
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const animation = await AnimationsController.get(id);
    return res.status(200).json(animation);
  })
);

router.put("/:id", AuthMiddleware.guard, asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user._id;
  const body = req.body;
  const animation = await AnimationsController.updateSettings({ id, user, body });
  return res.status(200).json(animation);
}));

router.post(
  "/:id",
  AuthMiddleware.guard,
  asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const user = req.user._id;
    const { data } = req.body;
    const animation = await AnimationsController.insertFrame({ id, user, data });
    return res.status(201).json(animation);
  })
);

router.delete("/:id", AuthMiddleware.guard, asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user._id;
  await AnimationsController.delete({ id, user });
  return res.status(204).send(false);
}));

router.post(
  "/:id/upvote",
  AuthMiddleware.guard,
  asyncMiddleware(async (req, res, next) => {
    const user = req.user._id;
    const { id } = req.params;
    const result = await AnimationsController.toggleUpvote({ user, id });
    return res.status(201).json(result);
  })
);

router.get("/:id/history", asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const result = await AnimationsController.getHistory({ id });
  return res.status(201).json(result);
}));

module.exports = router;
