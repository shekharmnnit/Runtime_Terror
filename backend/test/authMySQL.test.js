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
  describe('POST /api/secureLogin', () => {
    it('should authenticate a user and return a token', async () => {
      // Arrange: Prepare test data
      const testUser = {
        email: 'twenty_nov_user@gmail.com',
        password: 'kunal20Nov@second.com',
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
        .post('/api/secureLogin')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      
      console.log("result", res.body);

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
        .post('/api/secureLogin')
        .send(invalidCredentials);

      // Assert: Check the response
      // Expect a 400 status code
      expect(res).to.have.status(400);
      // Expect the response to contain an error message
      expect(res.body).to.have.property('errors');
    });
  });
});

// describe('User Update API', () => {
//   // This hook will run before the tests
//   before(async () => {
//     // Add any setup code here
//     // This might include starting your server in a test mode
//   });

//   describe('POST /api/updateProfile/:userId', () => {
//     it('should update a user profile and return the updated user', async () => {
//       // Arrange: Prepare test data
//       const testUser = {
//         email: 'update_user@gmail.com',
//         firstName: 'OldFirstName',
//         lastName: 'OldLastName',
//         password: 'updatePassword',
//       };

//       // Act: Create a user in the database
//       await createUser({
//         email: testUser.email,
//         firstName: testUser.firstName,
//         lastName: testUser.lastName,
//         password: await bcrypt.hash(testUser.password, 10),
//       });

//       // Act: Make a request to authenticate the user and get a token
//       const authRes = await chai
//         .request(app)
//         .post('/api/secureLogin')
//         .send({
//           email: testUser.email,
//           password: testUser.password,
//         });

//       console.log(authRes.body);

//       // Assert: Check the authentication response
//       expect(authRes).to.have.status(200);
//       expect(authRes.body).to.have.property('token');
//       const authToken = authRes.body.token;

//       // Act: Make a request to update the user profile
//       const updatedProfileRes = await chai
//         .request(app)
//         .post(`/api/updateProfile/${authRes.body.user.id}`)
//         .set('Authorization', `Bearer ${authToken}`)
//         .send({
//           firstName: 'NewFirstName',
//           lastName: 'NewLastName',
//           skills: ['Skill1', 'Skill2'],
//         });

//       // Assert: Check the response
//       expect(updatedProfileRes).to.have.status(201);
//       expect(updatedProfileRes.body).to.have.property('firstName', 'NewFirstName');
//       expect(updatedProfileRes.body).to.have.property('lastName', 'NewLastName');
//       expect(updatedProfileRes.body).to.have.property('skills').to.deep.equal(['Skill1', 'Skill2']);
//     });
//   });
// });