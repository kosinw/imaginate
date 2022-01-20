const router = require('express').Router();

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(200).send(false);
  }

  return res.status(200).send(req.user._id);
});


module.exports = router;