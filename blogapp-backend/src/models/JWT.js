const mongoose = require('mongoose');

const jwtTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
});

const JwtTokenModel = mongoose.model('jwtTokens', jwtTokenSchema);

module.exports = JwtTokenModel;