const mongoose = require('mongoose');

// Define the Comment schema for the comments in the post
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

// Define the Post schema
const PostSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    validate: [
      {
        validator: (value) => value.length >= 1 && value.length <= 5,
        message: 'Skills array must have between 1 and 5 elements',
      },
    ],
  },
  captions: {
    type: String,
    maxlength: 1000,
  },
  comments: {
    type: [CommentSchema], // Array of Comment objects
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now,
  },
});

// Create the Post model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;