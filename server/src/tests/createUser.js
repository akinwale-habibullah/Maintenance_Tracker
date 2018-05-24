import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import userRoute from '../routes/userRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const createUser = () => {
  describe('/POST User', () => {
    it('It should add new user', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Grace', lastName: 'Love', email: 'admin1@yahoo.com', password: 'test' })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully created an account');
          done();
        });
    });
    it('It should add new user with hyphen present in firstname', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Mike-bamiloye', lastName: 'Love', email: 'admin2@yahoo.com', password: 'test' })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully created an account');
          done();
        });
    });
    it('It should add new user with hyphen present in lastname', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'grace', lastName: 'Love-mercy', email: 'admin3@yahoo.com', password: 'test' })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully created an account');
          done();
        });
    });
    it('It should not add user if missing firstname field', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          lastName: 'Love', firstName: '', email: 'sinmi@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('All fields are required');
          done();
        });
    });
    it('It should not add user if missing lastname field', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          lastName: '', firstName: 'hello', email: 'sinmi@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('All fields are required');
          done();
        });
    });
    it('It should not add user if missing email field', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          lastName: 'Love', firstName: 'hello', email: '', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('All fields are required');
          done();
        });
    });
    it('It should not add user if missing password field', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          lastName: 'Love', firstName: 'hi', email: 'sinmi@yahoo.com', password: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('All fields are required');
          done();
        });
    });
    it('It should not create user with invalid email', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Grace', lastName: 'Love', email: 'sinmiyahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid email address');
          done();
        });
    });
    it('It should not create user with if first name is not valid', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Grace$$#@!', lastName: 'Love', email: 'sinmi@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('First name can only contain alphabelts and hyphen');
          done();
        });
    });
    it('It should not create user with if last name is not valid', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'praise', lastName: '11%$', email: 'sinmi@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Last name can only contain alphabelts and hyphen');
          done();
        });
    });
    it('It should not create account if firstname field is not a string', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 1, lastName: 'Love', email: 'sinmi@yahoo.com', password: 'test' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for firstName field');
          done();
        });
    });
    it('It should not create account if lastName field is not a string', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'joe', lastName: false , email: 'sinmi@yahoo.com', password: 'test' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for lastName field');
          done();
        });
    });
    it('It should not create account if email field is not a string', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'joe', lastName: 'Love', email: 5 , password: 'test' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for email field');
          done();
        });
    });
    it('It should not create account if password field is not a string', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'hello', lastName: 'Love', email: 'sinmi@yahoo.com', password: false })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for password field');
          done();
        });
    });
  });
};
export default createUser;