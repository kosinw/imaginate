/*
|--------------------------------------------------------------------------
| routes/index.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const router = require("express").Router();

const animations = require("./animations");
const users = require("./users");
const auth = require("./auth");

router.use("/", auth);
router.use("/animations", animations);
router.use("/users", users);

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
