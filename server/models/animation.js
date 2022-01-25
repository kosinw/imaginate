const mongoose = require("mongoose");

const AnimationSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  creationTime: { type: Date, default: Date.now, required: true },
  updateTime: { type: Date, default: Date.now, required: true },
  framerate: { type: Number, required: true },
  resolution: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  frames: [{ type: mongoose.Schema.Types.ObjectId, ref: "frame", default: [], required: true }],
  upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }],
  score: { type: Number, default: 0, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "animation" },
});

AnimationSchema.virtual("thumbnail").get(function () {
  return this.frames.length > 0 ? this.frames[0].data : null;
});

AnimationSchema.index({ title: "text" });

// compile model from schema
module.exports = mongoose.model("animation", AnimationSchema);
