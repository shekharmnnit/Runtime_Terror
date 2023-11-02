const mongoose = require('mongoose');
const Notification = require('./Notification').schema


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  skills: [{
    type:String
  }],
  createdPostIds: [mongoose.Schema.Types.ObjectId],
  commentedPostIds: [mongoose.Schema.Types.ObjectId],
  notifications: [Notification]
});

module.exports = mongoose.model('user', UserSchema);