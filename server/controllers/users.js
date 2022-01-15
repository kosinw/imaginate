const User = require("../models/user.js");
const Animation = require("../models/animation");

class UsersController {
  static async get(id) {
    const user = await User.findById(id);
    return user;
  }

  static async getAnimations(id) {
    const animations = await Animation.find({ creator: id })
      .populate({
        path: "creator",
        model: User
      });

    return animations;
  }
}

module.exports = UsersController;