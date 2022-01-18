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

  static async create({ creator, framerate, resolution, title }) {
    const animation = new Animation({
      creator,
      framerate,
      title,
      resolution,
      frames: [],
      upvoters: [creator]
    });

    await animation.save();

    return animation;
  }

  static async insertFrame({ id, data, user }) {
    const animation = await AnimationsController.get(id);

    const frame = new Frame({ user, data });
    await frame.save();

    animation.frames.push(frame);
    animation.updateTime = Date.now();

    await animation.save();

    return animation;
  }
}

module.exports = AnimationsController;
