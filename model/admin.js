let mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/, 
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
});

module.exports = mongoose.model("admin", adminSchema);
