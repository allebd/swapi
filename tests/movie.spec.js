import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';

chai.use(chaiHttp);

const BASE_URL = '/api/v1';
const MOVIES_URL = `${BASE_URL}/movies`;

describe('MOVIE TEST', () => {
  describe('GET ALL MOVIES TEST', () => {
    it('should return a list on all movies found', (done) => {
      chai.request(server)
        .get(`${MOVIES_URL}`)
        .end((error, response) => {
          expect(response, 'must have a status 200 ok').to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });
});
