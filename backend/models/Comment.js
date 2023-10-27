const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commentedByFirstName: {
      type: String,
      required: true,
    },
    commentedByLastName: {
      type: String,
      required: true,
    },
    commentString: {
      type: String,
    },
    lastUpdatedOn: {
      type: Date,
      default: Date.now,
    },
  });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;