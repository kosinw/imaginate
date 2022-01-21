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
      })
      .populate({
        path: "parent",
        populate: {
          path: "creator",
          model: User,
        },
        model: Animation,
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
      })
      .populate({
        path: "parent",
        populate: {
          path: "creator",
          model: User,
        },
        model: Animation,
      });

    return animation;
  }

  static async create({ creator, framerate, resolution, title, frames, parent }) {
    const animation = new Animation({
      creator,
      framerate,
      title,
      resolution,
      frames,
      parent,
      upvoters: [creator],
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

  static async toggleUpvote({ id, user }) {
    const animation = await AnimationsController.get(id);

    if (animation.upvoters.includes(user)) {
      animation.upvoters.pull(user);
      await animation.save();
      return false;
    } else {
      animation.upvoters.push(user);
      await animation.save();
      return true;
    }
  }
}

module.exports = AnimationsController;
