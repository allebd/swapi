import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';

chai.use(chaiHttp);

describe('SERVER TEST', () => {
  it('should return a string on default url path', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should return 404 on not found request', (done) => {
    chai.request(server)
      .get('/xyz')
      .end((error, response) => {
        expect(response).to.have.status(404);
        done();
      });
  });
});
