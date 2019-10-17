import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import mockData from './mockData';

chai.use(chaiHttp);

const { commentMock } = mockData;
const { validComment, invalidComment } = commentMock;

const BASE_URL = '/api/v1';
const COMMENT_VALID_URL = `${BASE_URL}/movie/1/comments`;
const NO_COMMENT_VALID_URL = `${BASE_URL}/movie/5/comments`;
const COMMENT_INVALID_URL = `${BASE_URL}/movie/kk/comments`;
const COMMENT_NOT_FOUND_URL = `${BASE_URL}/movie/10000/comments`;

describe('COMMENT TEST', () => {
  describe('CREATE A COMMENT FOR A MOVIE', () => {
    it('should return an error response if the episode id provided is not an integer', (done) => {
      chai.request(server)
        .post(COMMENT_INVALID_URL)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('episodeId');
          expect(response.body.error[0].message).to.equal('episodeId must be an integer');
          done();
        });
    });

    it('should return an error message if the episode id supplied does not exist', (done) => {
      chai.request(server)
        .post(COMMENT_NOT_FOUND_URL)
        .send(validComment)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('movie not found');
          done();
        });
    });

    it('should return an error if the the commentBody is missing from the request', (done) => {
      chai.request(server)
        .post(COMMENT_VALID_URL)
        .send({})
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error[0].message).to.equal('commentBody is a required field');
          done();
        });
    });

    it('should return an error if the the commentBody is missing from the request', (done) => {
      chai.request(server)
        .post(COMMENT_VALID_URL)
        .send(invalidComment)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error[0].message).to.equal('commentBody cannot be empty');
          done();
        });
    });

    it('should successfully create a comment', (done) => {
      chai.request(server)
        .post(COMMENT_VALID_URL)
        .send(validComment)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data[0]).to.haveOwnProperty('comment');
          expect(response.body.data[0].comment).to.be.an('object');
          expect(response.body.data[0].comment).to.have.keys(['id', 'movieId', 'commentBody', 'publicIp', 'createdAt', 'updatedAt']);
          done();
        });
    });
  });

  describe('GET ALL MOVIE COMMENTS', () => {
    it('should return an error response if the episode id provided is not an integer', (done) => {
      chai.request(server)
        .get(COMMENT_INVALID_URL)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('episodeId');
          expect(response.body.error[0].message).to.equal('episodeId must be an integer');
          done();
        });
    });

    it('should return an error message if the episode id supplied does not exist', (done) => {
      chai.request(server)
        .get(COMMENT_NOT_FOUND_URL)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('movie not found');
          done();
        });
    });

    it('should successfully return the characters for that movie episode supplied', (done) => {
      chai.request(server)
        .get(COMMENT_VALID_URL)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data[0]).to.have.keys(['comments', 'currentPage', 'totalPages', 'limit']);
          done();
        });
    });
  });

  describe('PAGINATION SUPPORT FOR COMMENT LISTING', () => {
    it('should return an error response if the page provided is not an integer', (done) => {
      chai.request(server)
        .get(COMMENT_VALID_URL)
        .query({ page: 'abc', limit: 20 })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('page');
          expect(response.body.error[0].message).to.equal('page must be an integer');
          done();
        });
    });

    it('should return an error response if the limit provided is not an integer', (done) => {
      chai.request(server)
        .get(COMMENT_VALID_URL)
        .query({ page: 1, limit: 'abc' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('limit');
          expect(response.body.error[0].message).to.equal('limit must be an integer');
          done();
        });
    });

    it('should return an error response if the limit query provided is empty', (done) => {
      chai.request(server)
        .get(COMMENT_VALID_URL)
        .query({ page: 1, limit: '' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('limit');
          expect(response.body.error[0].message).to.equal('limit cannot be empty');
          done();
        });
    });

    it('should return an error response if the page query provided is empty', (done) => {
      chai.request(server)
        .get(COMMENT_VALID_URL)
        .query({ page: '', limit: 10 })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('page');
          expect(response.body.error[0].message).to.equal('page cannot be empty');
          done();
        });
    });

    it('should return an appropriate message if the count of comments gotten from the database is less than 1', (done) => {
      chai.request(server)
        .get(NO_COMMENT_VALID_URL)
        .query({ page: 1, limit: 10 })
        .end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });

    it('should return an error message if the page number supplied is more than the available pages', (done) => {
      chai.request(server)
        .get(COMMENT_VALID_URL)
        .query({ page: 1000, limit: 10 })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('page not found');
          done();
        });
    });

    it('should successfully return the comments for that page', (done) => {
      chai.request(server)
        .get(COMMENT_VALID_URL)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.keys(['status', 'message', 'data']);
          expect(response.body.data[0]).to.have.keys(['comments', 'currentPage', 'totalPages', 'limit']);
          expect(response.body.message).to.be.a('string');
          expect(response.body.data).to.be.an('array');
          expect(response.body.message).to.equal('comments successfully retrieved');
          expect(response.body.data.length).to.not.equal(0);
          done();
        });
    });
  });
});
