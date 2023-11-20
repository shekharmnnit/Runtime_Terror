const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    postOwnerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postOwnerFullName: {
      type: String,
      required: true,
    },
    operation: {
      type: String,
      enum: ['comment','upvote','downvote'],
      required: true,
    },
    operationBy: {
      type: String
    },
    postId: {
      type: String,
    },
    postCaption: {
        type: String,
    },
    createdOn: {
      type: Date,
      default: Date.now,
   },
},{versionKey: false});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;