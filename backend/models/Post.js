const mongoose = require('mongoose');
const Comment = require('./Comment').schema;


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
  caption: {
    type: String,
    maxlength: 1000,
  },
  fileName: {
    type:String,
  },
  comments: {
    type: [Comment], // Array of Comment objects
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  downvotes: {
    type: [mongoose.Schema.Types.ObjectId]
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