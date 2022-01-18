const mongoose = require("mongoose");

const AnimationSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  creationTime: { type: Date, default: Date.now(), required: true },
  updateTime: { type: Date, default: Date.now(), required: true },
  framerate: { type: Number, required: true },
  resolution: {
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  frames: [{ type: mongoose.Schema.Types.ObjectId, ref: "frame", required: true }],
  upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }],
});

AnimationSchema.virtual("score").get(function () {
  return this.upvoters.length;
});

AnimationSchema.virtual("thumbnail").get(function () {
  return this.frames.length > 0 ? this.frames[0].data : null;
});

// compile model from schema
module.exports = mongoose.model("animation", AnimationSchema);
