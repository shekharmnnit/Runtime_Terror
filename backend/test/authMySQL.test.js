const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before } = require('mocha');
const { app } = require('../server'); // Adjust the path as per your project structure
const { getUserByEmail, createUser } = require('../mySQL/connectMySQL'); // Adjust the path as per your project structure
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication API', () => {
  // This hook will run before the tests
  before(async () => {
    // Add any setup code here
    // This might include starting your server in a test mode
  });
  describe('POST /api/login', () => {
    it('should authenticate a user and return a token', async () => {
      // Arrange: Prepare test data
      const testUser = {
        email: 'test3@example.com',
        password: 'test3password',
      };

      // Act: Create a user in the database
      await createUser({
        email: testUser.email,
        firstName: 'Test',
        lastName: 'User',
        password: await bcrypt.hash(testUser.password, 10),
      });

      // Act: Make a request to authenticate the user
      const res = await chai
        .request(app)
        .post('/api/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      // Assert: Check the response
      // Expect a 200 status code
      expect(res).to.have.status(200);
      // Expect the response to have a token property
      expect(res.body).to.have.property('token');
    });

    it('should return an error for invalid credentials', async () => {
      // Arrange: Prepare test data with incorrect credentials
      const invalidCredentials = {
        email: 'nonexistent@example.com',
        password: 'invalidpassword',
      };

      // Act: Make a request with invalid credentials
      const res = await chai
        .request(app)
        .post('/api/login')
        .send(invalidCredentials);

      // Assert: Check the response
      // Expect a 400 status code
      expect(res).to.have.status(400);
      // Expect the response to contain an error message
      expect(res.body).to.have.property('errors');
    });
  });
});
