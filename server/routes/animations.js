const router = require('express').Router();
const AnimationsController = require('../controllers/animations');

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

module.exports = router;
