const mongoose = require('mongoose');

const jwtTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

const JwtTokenModel = mongoose.model('jwtTokens', jwtTokenSchema);

module.exports = JwtTokenModel;
