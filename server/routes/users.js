const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

const { asyncMiddleware } = require("../middlewares/error");
const paginate = require("../utils/paginate");

router.get(
  "/:id/animations",
  asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    let animations = {};
    if (req.query.order === "score") {
      animations = await UsersController.getAnimationsByScoreDescending(id);
    } else if (req.query.order === "latest") {
      animations = await UsersController.getAnimationsByLatest(id);
    } else {
      animations = await UsersController.getAnimations(id);
    }

    animations = paginate(req.query, animations, 12);

    return res.status(200).json(animations);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const user = await UsersController.get(id);
    return res.status(200).json(user);
  })
);

module.exports = router;
