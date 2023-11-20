const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
// const app = require('../your-express-app'); // Import your Express app
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /api/posts/create', () => {
  // Before each test, clear the Post collection
  beforeEach(async () => {
    await mongoose.connection.collection('posts').deleteMany({});
  });

  it('should create a new post', async () => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1YjhjOTM2ZWNlNDUwN2Q4MzQ1NWM5In0sImlhdCI6MTcwMDQ5ODU3OSwiZXhwIjoxNzAwOTMwNTc5fQ.IYZozJiqCndePv4WipxhZiK0dt9Ve8l2GmU6eYWlZ0c'; // Replace with a valid user token

    // Send a POST request to create a new post
    const res = await chai
      .request(app)
      .post('/api/posts/create')
      .set('x-auth-token', userToken)
      .field('skills', 'Nodejs,Reactjs,MongoDB')
      .field('caption', 'This is a test post to unit-testing')
      .attach('postfile', '/Users/kunal/Desktop/Project Proposal 08 September (1).pdf');

    //console.log(res);

    // Assert the response status code
    expect(res).to.have.status(201);

    // Assert the response body
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('userId');
    expect(res.body).to.have.property('email');
    expect(res.body).to.have.property('firstName');
    expect(res.body).to.have.property('lastName');
    expect(res.body).to.have.property('skills').to.deep.equal(['Nodejs', 'Reactjs', 'MongoDB']);
    expect(res.body).to.have.property('caption').to.equal('This is a test post to unit-testing');
    expect(res.body).to.have.property('fileName');
    expect(res.body).to.have.property('upvotes').to.be.an('array');
    expect(res.body).to.have.property('downvotes').to.be.an('array');
    expect(res.body).to.have.property('comments').to.be.an('array');
    expect(res.body).to.have.property('createdOn');
    expect(res.body).to.have.property('lastUpdatedOn');
  });
});

describe('POST /api/posts/update/:postId', () => {
    let userToken;
    let postId;
  
    // Before running the tests, create a test user and post for updating
    before(async () => {
      // Create a user
      const user = new User({
        email: 'test.user@example.com',
        password: 'testpassword',
        firstName: 'Test',
        lastName: 'User',
        skills: '["JavaScript", "Node.js", "React"]'
      });
      const savedUser = await user.save();
  
      // Create a post
      const post = new Post({
        userId: savedUser._id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        skills: savedUser.skills,
        caption: 'Test post caption',
        fileName: 'testfile.pdf',
      });
      const savedPost = await post.save();
  
      // Hardcode the user token and post ID
      userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1YmM5M2YzZTM1M2YxNzkzNTdhZWE5In0sImlhdCI6MTcwMDUxNDExMSwiZXhwIjoxNzAwOTQ2MTExfQ.QUFHMcFTpPPshjXm-EmpnHMn9Uf648UlHVBK8Tx2w4o'; // Replace with your actual hardcoded token
      postId = savedPost._id;
    });
  
    // After running the tests, clean up the test user and post
    after(async () => {
      await User.deleteMany({ email: 'test.user@example.com' });
      await Post.deleteMany({ caption: 'Test post caption' });
    });
  
    it('should update a post', async () => {
      const updatedSkills = 'updated,nodejs';
      const updatedCaption = 'This is the updated caption';
  
      const res = await chai
        .request(app)
        .post(`/api/posts/update/${postId}`)
        .set('x-auth-token', userToken)
        .send({
          skills: updatedSkills,
          caption: updatedCaption,
        });
  
      // Assert the response status code
      expect(res).to.have.status(200);
  
      // Assert the response body
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id').to.equal(postId.toString());
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('firstName');
      expect(res.body).to.have.property('lastName');
      expect(res.body).to.have.property('skills').to.deep.equal(updatedSkills.split(','));
      expect(res.body).to.have.property('caption').to.equal(updatedCaption);
      expect(res.body).to.have.property('fileName');
      expect(res.body).to.have.property('upvotes').to.be.an('array');
      expect(res.body).to.have.property('downvotes').to.be.an('array');
      expect(res.body).to.have.property('comments').to.be.an('array');
      expect(res.body).to.have.property('createdOn');
      expect(res.body).to.have.property('lastUpdatedOn');
    });
  
    // Add more test cases if needed
  });


  describe('GET /api/posts/fetch/:postId', () => {
    let userToken;
    let postId;
  
    // Before running the tests, create a test user and post for fetching
    before(async () => {
      // Create a user
      const user = new User({
        email: 'test.user2@example.com',
        password: 'testpassword',
        firstName: 'Test2',
        lastName: 'User2',
        skills: '["JavaScript", "Node.js", "React"]'
      });
      const savedUser = await user.save();
  
      // Create a post
      const post = new Post({
        userId: savedUser._id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        skills: savedUser.skills,
        caption: 'Test post for fetching',
        fileName: 'testfile.pdf',
      });
      const savedPost = await post.save();
  
      // Hardcode the user token and post ID
      userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1YmQwNTRkNTZlNGIxYzIxNzE1Nzc2In0sImlhdCI6MTcwMDUxNTkyNCwiZXhwIjoxNzAwOTQ3OTI0fQ.NysVLyg9RfSRlnFdMo_mClNNx_4JoqKZkZYJJ6PUK98'; // Replace with your actual hardcoded token
      postId = savedPost._id;
    });
  
    // After running the tests, clean up the test user and post
    after(async () => {
      await User.deleteMany({ email: 'test.user2@example.com' });
      await Post.deleteMany({ caption: 'Test post for fetching' });
    });
  
    it('should fetch a post by postId', async () => {
      const res = await chai
        .request(app)
        .get(`/api/posts/fetch/${postId}`)
        .set('x-auth-token', userToken);
  
      // Assert the response status code
      expect(res).to.have.status(200);
  
      // Assert the response body
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id').to.equal(postId.toString());
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('firstName');
      expect(res.body).to.have.property('lastName');
      expect(res.body).to.have.property('skills').to.be.an('array');
      expect(res.body).to.have.property('caption');
      expect(res.body).to.have.property('fileName');
      expect(res.body).to.have.property('upvotes').to.be.an('array');
      expect(res.body).to.have.property('downvotes').to.be.an('array');
      expect(res.body).to.have.property('comments').to.be.an('array');
      expect(res.body).to.have.property('createdOn');
      expect(res.body).to.have.property('lastUpdatedOn');
    });
  });