import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';

chai.use(chaiHttp);

describe('SERVER TEST', () => {
  it('its expected to return a string on default url path', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res, 'must have a status 200 ok').to.have.status(200);
        done();
      });
  });

  it('its expected to return 404 on not found request', (done) => {
    chai.request(server)
      .get('/xyz')
      .end((err, res) => {
        expect(res, 'must have a status 404 not found').to.have.status(404);
        done();
      });
  });
});
