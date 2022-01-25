const User = require("../models/user.js");
const Animation = require("../models/animation");
const Frame = require("../models/frame");

class UsersController {
  static async get(id) {
    const user = await User.findById(id);
    return user;
  }

  static async getAnimations(id) {
    const animations = await Animation.find({ creator: id })
      .populate({
        path: "creator",
        model: User,
      })
      .populate({
        path: "frames",
        model: Frame,
      });

    return animations;
  }

  static async getAnimationsByScoreDescending(id) {
    const animations = await Animation.find({ creator: id })
      .populate({
        path: "creator",
        model: User,
      })
      .populate({
        path: "frames",
        model: Frame,
      })
      .sort("-score");

    return animations;
  }

  static async getAnimationsByLatest(id) {
    const animations = await Animation.find({ creator: id })
      .populate({
        path: "creator",
        model: User,
      })
      .populate({
        path: "frames",
        model: Frame,
      })
      .sort("-updateTime");

    return animations;
  }
}

module.exports = UsersController;
