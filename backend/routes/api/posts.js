const express = require('express');
const router = express.Router();
const Post = require('../../models/Post'); // Import your Post model

// Create a new post
router.post('/create', async (req, res) => {
  try {
    console.log("reached /create");
    console.log("req.body " + req.body);
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create a post' });
  }
});


// Update a post by postId
router.put('/update/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const updateFields = req.body; // This should contain only the fields you want to update

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $set: updateFields }, // Use $set to update only specific fields
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Failed to update the post' });
  }
});


// Delete a post by postId
router.delete('/delete/:postId', async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.postId });
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete the post' });
  }
});

// Fetch a post by postId
router.get('/fetch/:postId', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Failed to fetch the post' });
  }
});

module.exports = router;