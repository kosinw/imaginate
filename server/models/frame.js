const mongoose = require("mongoose");

const FrameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  data: { type: String, required: true },
});

// compile model from schema
module.exports = mongoose.model("frame", FrameSchema);
