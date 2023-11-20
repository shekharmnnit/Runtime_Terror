const express = require('express');
const router = express.Router();
const Post = require('../../models/Post'); // Import your Post model

const { check, validationResult } = require('express-validator');
const Comment = require("../../models/Comment")
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId'); 

const Notification = require('../../models/Notification')

const mongoose = require('mongoose')
const path = require('path');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const db = "mongodb://127.0.0.1:27017/reviewme"
const conn = mongoose.createConnection(db);

conn.on('error', e => {
    throw e;
})

let gfs, gridfsBucket;
conn.once('open', () => {
    // Init stream
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
    console.log("MongoDB connected...")
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads');
});
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = Date.now() + path.extname(file.originalname);
        req.fileName = filename;
        const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
    }
});

const upload = multer({ storage: storage });

// Create a new post
router.post('/create', 
              auth, 
              upload.single('postfile'), 
  async (req, res) => {
  try {
    const sessionUser = await User.findById(req.user.id).select('-password');
    console.log(sessionUser)
    const skills = req.body.skills.split(',');
    const newPost = new Post({
      userId: sessionUser._id,
      email: sessionUser.email,
      firstName: sessionUser.firstName,
      lastName: sessionUser.lastName,
      skills: skills,
      caption: req.body.caption,
      fileName: req.fileName,
    });
    // const newPost = new Post();
    const savedPost = await newPost.save();
    sessionUser.createdPostIds.unshift(savedPost._id);
    await sessionUser.save()
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create a post' });
  }
});


// Update a post by postId
router.post('/update/:postId', 
auth,
checkObjectId('postId'),
async (req, res) => {
  try {
    const postId = req.params.postId;
    // const updateFields = req.body; // This should contain only the fields you want to update
    const updateFields = {}
    let skills = req.body.skills;
    const caption = req.body.caption;
    if (skills.length != 0){
      updateFields.skills = skills.split(',')
    } 
    if (caption.length != 0){
      updateFields.caption=caption;
    }
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
    console.log(req.params.postId)
    console.log(sessionUser.createdPostIds)
    const id_ind = sessionUser.createdPostIds.findIndex(postid => postid.id == req.params.postId);
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
    let flag=0;
    // Check if the post has already been liked
    const indexU = post.upvotes.indexOf(req.user.id);
    const indexD = post.downvotes.indexOf(req.user.id);
    if (indexD > -1){
      post.downvotes.splice(indexU,1)
    } else if (indexU > -1){
      post.downvotes.unshift(req.user.id);
      post.upvotes.splice(indexD, 1);
      flag=1;
    } else {
      post.downvotes.unshift(req.user.id);
      flag=1;
    }
    await post.save();
    console.log("value flag: ",flag)
    if (flag==1){
      const postOwner = await User.findById(post.userId);
      postOwner.notifications.unshift(new Notification({
        postOwnerUserId: postOwner._id,
        postOwnerFullName: postOwner.firstName+" "+postOwner.lastName,
        operation: "downvote",
        postId: post._id,
        postCaption: post.caption,
        createdOn: Date.now()
      }))
      await postOwner.save();
    }
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
    const indexU = post.upvotes.indexOf(req.user.id)
    const indexD = post.downvotes.indexOf(req.user.id)
    let flag = 0;
    if (indexU > -1){
      post.upvotes.splice(indexU,1)
      console.log('reached non flag if')
    } 
    if (indexD > -1){
      post.upvotes.unshift(req.user.id);
      post.downvotes.splice(indexD, 1);
      flag=1;
    } else {
      flag=1;
      post.upvotes.unshift(req.user.id);
    }
    await post.save();
    if (flag==1){
      const postOwner = await User.findById(post.userId);
      postOwner.notifications.unshift(new Notification({
        postOwnerUserId: postOwner._id,
        postOwnerFullName: postOwner.firstName+" "+postOwner.lastName,
        operation: "upvote",
        postId: post._id,
        postCaption: post.caption,
        createdOn: Date.now()
      }))
      await postOwner.save();
    }
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
      const postOwner = await User.findById(post.userId);
      user.commentedPostIds.unshift(req.params.postid);
      postOwner.notifications.unshift(new Notification({
        postOwnerUserId: postOwner._id,
        postOwnerFullName: postOwner.firstName+" "+postOwner.lastName,
        operation: "comment",
        postId: post._id,
        postCaption: post.caption,
        createdOn: Date.now()
      }))
      await user.save();
      await postOwner.save();
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)

router.get('/notifications',
  auth,
  async (req, res) => {
    try{
      const sessionUser = await User.findById(req.user.id);
      let notificationsRemaining = 0;
      if (sessionUser.notificationsShowedTillNow < sessionUser.notifications.length) {
        notificationsRemaining = sessionUser.notifications.length - sessionUser.notificationsShowedTillNow;
      }
      sessionUser.notificationsShowedTillNow = sessionUser.notifications.length
      await sessionUser.save();
      return res.status(201).json({
        notifications:sessionUser.notifications,
        notificationsRemaining
      });
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)

router.get('/getFile/:fileName', async (req, res) => {
  console.log("reached route");
  const file = await gfs.files.findOne({filename:req.params.fileName});
  if (!file || file.length === 0) {
      return res.status(404).json({
          err: 'No file exists'
      });
  }

  if(file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpeg'){
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res)
  } else {
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res)
      // res.json('yet to be handled')
  }
});

module.exports = router;