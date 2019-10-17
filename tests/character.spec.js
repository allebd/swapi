import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';

chai.use(chaiHttp);

const BASE_URL = '/api/v1';
const CHARACTERS_VALID_URL = `${BASE_URL}/movie/1/characters`;
const CHARACTERS_INVALID_URL = `${BASE_URL}/movie/kk/characters`;
const CHARACTERS_NOT_FOUND_URL = `${BASE_URL}/movie/10000/characters`;

describe('CHARACTER TEST', () => {
  describe('GET ALL MOVIE CHARACTERS', () => {
    it('should return an error response if the episode id provided is not an integer', (done) => {
      chai.request(server)
        .get(CHARACTERS_INVALID_URL)
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

    it('should return an error response if the sort query provided is empty', (done) => {
      chai.request(server)
        .get(CHARACTERS_VALID_URL)
        .query({ sort: '' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('sort');
          expect(response.body.error[0].message).to.equal('sort can only be one of: \'name\', \'gender\', \'height\'');
          done();
        });
    });

    it('should return an error response if the order query provided is empty', (done) => {
      chai.request(server)
        .get(CHARACTERS_VALID_URL)
        .query({ order: '' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('order');
          expect(response.body.error[0].message).to.equal('order can only be one of: \'asc\', \'desc\'');
          done();
        });
    });

    it('should return an error response if the order query provided is invalid', (done) => {
      chai.request(server)
        .get(CHARACTERS_VALID_URL)
        .query({ order: 'express' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          done();
        });
    });

    it('should return an error response if the only order query is provided', (done) => {
      chai.request(server)
        .get(CHARACTERS_VALID_URL)
        .query({ order: 'desc' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.equal('order cannot be used without a sort parameter');
          done();
        });
    });

    it('should return an error message if the episode id supplied does not exist', (done) => {
      chai.request(server)
        .get(CHARACTERS_NOT_FOUND_URL)
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
        .get(CHARACTERS_VALID_URL)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data[0]).to.have.keys(['movieCharacters', 'metadata']);
          done();
        });
    });

    it('should successfully return the characters for that movie episode supplied with sort, filter only', (done) => {
      chai.request(server)
        .get(CHARACTERS_VALID_URL)
        .query({ sort: 'name', filter: 'male' })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data[0]).to.have.keys(['movieCharacters', 'metadata']);
          done();
        });
    });

    it('should successfully return the characters for that movie episode supplied with sort, order only', (done) => {
      chai.request(server)
        .get(CHARACTERS_VALID_URL)
        .query({ sort: 'gender', order: 'desc' })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data[0]).to.have.keys(['movieCharacters', 'metadata']);
          done();
        });
    });

    it('should successfully return the characters for that movie episode supplied with sort, filter in capital letter only', (done) => {
      chai.request(server)
        .get(CHARACTERS_VALID_URL)
        .query({ sort: 'height', filter: 'feMALE' })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data[0]).to.have.keys(['movieCharacters', 'metadata']);
          done();
        });
    });
  });
});
