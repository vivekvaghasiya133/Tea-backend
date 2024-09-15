let mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("area", adminSchema);
