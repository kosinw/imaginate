const mongoose = require("mongoose");

const AnimationSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  creationTime: { type: Date, default: Date.now(), required: true },
  updateTime: { type: Date, default: Date.now(), required: true },
  frames: [{ type: mongoose.Schema.Types.ObjectId, ref: "frame", required: true }],
  upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }],
});

AnimationSchema.virtual("score").get(function () {
  return this.upvoters.length;
});

// compile model from schema
module.exports = mongoose.model("animation", AnimationSchema);
