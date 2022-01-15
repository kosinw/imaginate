const Animation = require('../models/animation');
const Frame = require('../models/frame');
const User = require('../models/user');

class AnimationsController {
  static async getAll() {
    const animations = await Animation.find({})
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

  static async get(id) {
    const animation = await Animation.findOne({ _id: id })
      .populate({
        path: "creator",
        model: User
      })
      .populate({
        path: "frames",
        model: Frame,
      });

    return animation;
  }
}

module.exports = AnimationsController