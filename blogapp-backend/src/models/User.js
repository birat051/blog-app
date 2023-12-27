const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const UserDataModel =
  mongoose.models.users || mongoose.model('users', userSchema);

module.exports = UserDataModel;
