const Animation = require("../models/animation");
const Frame = require("../models/frame");
const User = require("../models/user");

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
        model: User,
      })
      .populate({
        path: "frames",
        model: Frame,
      });

    return animation;
  }

  static async createAnimation(animationObj) {
    const animation = new Animation(animationObj);
    const savedAnimation = await animation.save();
    return savedAnimation;
  }

  static async addFrame(animationId, frameObj) {
    const frame = new Frame(frameObj);
    const savedFrame = await frame.save();
    const animation = await this.get(animationId);
    animation.updateTime = Date.now();
    animation.frames.push(savedFrame._id);
    const savedAnimation = await animation.save();
    return savedAnimation;
  }
}

module.exports = AnimationsController;
