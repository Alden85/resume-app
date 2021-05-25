const mongoose = require('mongoose');
const validator = require('validator');

const profileSchema = new mongoose.Schema({
  adress: {
    type: String,
    trim: true,
  },
  tel: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  marriedStatus: {
    type: String,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
