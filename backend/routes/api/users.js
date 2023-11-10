const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const User = require('../../models/User');
const Post = require('../../models/Post');
const connectMySQL = require('../../mySQL/connectMySQL');

// @route    POST api/register
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('firstName', 'First Name is required').notEmpty(),
  check('lastName', 'Last Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('skills', 'Please enter 1 to 5 skills').isArray({ min:1, max:5 }),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, skills } = req.body;

    try {

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
        skills
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create a new user in MySQL with encrypted password
      const createUserResult = await connectMySQL.createUser({
        email,
        firstName,
        lastName,
        password: user.password, // Use the encrypted password
      });

      if (createUserResult.error) {
        return res.status(500).json({ error: createUserResult.error });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/fetchProfile/:userId',
  auth,
  checkObjectId('userId'),
  async (req,res) => {
    // userId, email, firstname, lastname, commentedposts, createdPosts
    try {
      const user = User.findById(req.params.userId).select('-password');
      const createdPosts = []
      const commentedPosts = []
      user.createdPostIds.forEach(async postId => {
        createdPosts.unshift(await Post.findById(postId));
      });
      user.commentedPostIds.forEach(async postId => {
        commentedPosts.unshift(await Post.findById(postId));
      })
      return res.status(201).json({
        user,
        commentedPosts,
        createdPosts
      });
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
)

router.post('/updateProfile/:userId',
  auth,
  checkObjectId('userId'),
  async (req,res) => {
    const { email, firstName, lastName } = req.body;
    // userId, email, firstname, lastname, commentedposts, createdPosts
    try {
      const user = User.findById(req.params.userId);
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body }, // Use $set to update only specific fields
        { new: true }
      );

      // Update user attributes based on the request body
      if (email) {
        user.email = email; // Update email if provided
      }

      if (firstName) {
        user.firstName = firstName; // Update first name if provided
      }

      if (lastName) {
        user.lastName = lastName; // Update last name if provided
      }

      // Update the user in MySQL
      const updateUserResult = await connectMySQL.updateUser({
        email: user.email, // Use email to identify the user in MySQL
        firstName: user.firstName,
        lastName: user.lastName,
      });

      if (updateUserResult.error) {
        return res.status(500).json({ error: updateUserResult.error });
    }

      await updatedUser.save();
      return res.status(201).json(updatedUser);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
)

module.exports = router;