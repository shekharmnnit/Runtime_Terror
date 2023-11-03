const express = require('express');
const router = express.Router();
const Post = require('../../models/Post'); // Import your Post model

const { check, validationResult } = require('express-validator');
const Comment = require("../../models/Comment")
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId'); 

const Notification = require('../../models/Notification')

// Create a new post
router.post('/create', auth, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    const sessionUser = await User.findById(req.user.id);
    sessionUser.createdPostIds.unshift(savedPost._id);
    await sessionUser.save()
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create a post' });
  }
});


// Update a post by postId
router.put('/update/:postId', auth, async (req, res) => {
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
router.delete('/delete/:postId', auth, async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.postId });
    const sessionUser = await User.findById(req.user.id);
    const id_ind = sessionUser.createdPostIds.findIndex(req.params.postId);
    if (id_ind>-1) {
      sessionUser.createdPostIds.splice(id_ind, 1);
    }
    sessionUser.save()

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

// Fetch all posts
router.get('/fetchAll', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    res.status(500).json({ message: 'Failed to fetch all posts' });
  }
});

// Fetch posts by a specific skill from the request body
router.post('/searchBySkill', async (req, res) => {
  const skillToSearch = req.body.skill; // Get the skill from the request body

  try {
    const posts = await Post.find({ skills: skillToSearch });
    res.json(posts);
  } catch (error) {
    console.error(`Error fetching posts with skill '${skillToSearch}':`, error);
    res.status(500).json({ message: `Failed to fetch posts with skill '${skillToSearch}'` });
  }
});

// @route    PUT api/posts/upvote/:postid
// @desc     Like a post
// @access   Private
router.put('/downvote/:postid', auth, checkObjectId('postid'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);

    // Check if the post has already been liked
    const indexI = post.upvotes.indexOf(req.user.id);
    const indexD = post.downvotes.indexOf(req.user.id);
    if (indexD > -1){
      post.downvotes.splice(indexI,1)
    } else if (indexI > -1){
      post.downvotes.unshift(req.user.id);
      post.upvotes.splice(indexD, 1);
    } else {
      post.downvotes.unshift(req.user.id);
    }
    await post.save();
    return res.json(post.downvotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/downvote/:postid
// @desc     Like a post
// @access   Private
router.put('/upvote/:postid', auth, checkObjectId('postid'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);

    // Check if the post has already been liked
    const indexI = post.upvotes.indexOf(req.user.id)
    const indexD = post.downvotes.indexOf(req.user.id)
    if (indexI > -1){
      post.upvotes.splice(indexI,1)
    } else if (indexD > -1){
      post.upvotes.unshift(req.user.id);
      post.downvotes.splice(indexD, 1);
    } else {
      console.log("reached the last else")
      post.upvotes.unshift(req.user.id);
    }

    await post.save();

    return res.json(post.upvotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:postid
// @desc     Comment on a post
// @access   Private

router.post(
  '/comment/:postid',
  auth,
  checkObjectId('postid'),
  check('text','Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.postid);
      const newComment = new Comment({
        commentedUserId: req.user.id,
        commentedByFirstName: user.firstName,
        commentedByLastName: user.lastName,
        commentString: req.body.text,
        lastUpdatedOn: Date.now()
      });
      post.comments.unshift(newComment);
      await post.save();
      console.log(user.createdPostIds.indexOf(req.params.postid))
      if(user.createdPostIds.indexOf(req.params.postid) == -1) {
        console.log("reached 2")
        user.commentedPostIds.unshift(req.params.postid);
      }
      await user.save();
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)

router.post('/notification/:postid',
  auth,
  checkObjectId('postid'),
  async (req, res) => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const post = await Post.findById(req.params.postid);
      const postOwner = await User.findById(post.userId);
      const sessionUser = await User.findById(req.user.id)
      const notification = new Notification({
        postOwnerUserId: post.userId,
        postOwnerFullName: sessionUser.firstName + " " + sessionUser.lastName,
        operation: req.body.operation,
        postId: post._id,
        postCaption: post.captions
      });
      postOwner.notifications.unshift(notification);
      await postOwner.save();
      return res.status(201).json(postOwner.notifications);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)

module.exports = router;