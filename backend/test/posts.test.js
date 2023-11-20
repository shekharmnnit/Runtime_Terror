const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
// const app = require('../your-express-app'); // Import your Express app
const mongoose = require('mongoose');

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

    console.log(res);

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
