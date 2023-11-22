const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('POST /api/posts/comment/:postid', () => {
  it('should post a comment on a post', (done) => {
    const postId = '655bf561786d50908863c2cd'; // Replace with a valid post ID

    chai
      .request(app)
      .post(`/api/posts/comment/${postId}`)
      .set('Content-Type', 'application/json')
      .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1YjhjOTM2ZWNlNDUwN2Q4MzQ1NWM5In0sImlhdCI6MTcwMDQ5ODU3OSwiZXhwIjoxNzAwOTMwNTc5fQ.IYZozJiqCndePv4WipxhZiK0dt9Ve8l2GmU6eYWlZ0c') // Replace with a valid authentication token
      .send({
        text: 'Sample comment to test comment route 4',
      })
      .end((err, res) => {
        // Check the response status and structure
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('commentedUserId');
        expect(res.body[0]).to.have.property('commentedByFirstName');
        expect(res.body[0]).to.have.property('commentedByLastName');
        expect(res.body[0]).to.have.property('commentString');
        expect(res.body[0]).to.have.property('lastUpdatedOn');
        expect(res.body[0]).to.have.property('_id');

        // Optionally, you can check the content of the comment
        expect(res.body[0].commentString).to.equal('Sample comment to test comment route 4');

        done();
      });
  });
});
