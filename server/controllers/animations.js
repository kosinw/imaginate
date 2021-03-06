const Animation = require("../models/animation");
const Frame = require("../models/frame");
const User = require("../models/user");

const Boom = require("@hapi/boom");

class AnimationsController {
  static async getAll() {
    const animations = await Animation.find()
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

  static async delete({ id, user }) {
    const animation = await AnimationsController.getLean(id);

    if (!animation.creator._id.equals(user)) {
      console.log(animation.creator, user);
      throw Boom.forbidden("User not authorized to delete this animation.");
    }

    await Animation.deleteOne({ _id: id });
  }

  static async getAllByScoreDescending() {
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
      })
      .sort("-score");

    return animations;
  }

  static async getAllByLatest() {
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
      })
      .sort("-updateTime");

    return animations;
  }

  static async getSearch(search) {
    const animations = await Animation.find({ $text: { $search: search } })
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

  static async getSearchByScoreDescending(search) {
    const animations = await Animation.find({ $text: { $search: search } })
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
      })
      .sort("-score");

    return animations;
  }

  static async getSearchByLatest(search) {
    const animations = await Animation.find({ $text: { $search: search } })
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
      })
      .sort("-updateTime");

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

  static async getLean(id) {
    return await Animation.findOne({ _id: id })
      .populate({
        path: "creator",
        model: User
      });
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
      score: 1,
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
      animation.score -= 1;
      await animation.save();
      return false;
    } else {
      animation.upvoters.push(user);
      animation.score += 1;
      await animation.save();
      return true;
    }
  }

  static async updateSettings({ id, user, body }) {
    const animation = await AnimationsController.get(id);

    if (!animation.creator._id.equals(user)) {
      throw Boom.forbidden("User not authorized to update this animation.");
    }

    const { title, framerate } = body;

    animation.title = title;
    animation.framerate = framerate;
    animation.updateTime = Date.now();

    await animation.save();

    return animation;
  }

  static async getHistory({ id }) {
    let animation = await AnimationsController.getLean(id);
    const result = [{
      id: animation.creator._id,
      title: animation.title,
      name: animation.creator.name,
      time: animation.creationTime,
      animationId: animation._id
    }];

    while (!!animation.parent) {
      try {
        animation = await AnimationsController.getLean(animation.parent);
        result.push({
          id: animation.creator._id,
          title: animation.title,
          name: animation.creator.name,
          time: animation.creationTime,
          animationId: animation._id
        });
      } catch (err) {
        break;
      }
    }

    return result;
  }
}

module.exports = AnimationsController;
