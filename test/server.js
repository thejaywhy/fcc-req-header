//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var server = require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('App', () => {

  beforeEach((done) => { 
    done();
  });

  describe('/GET index', () => {
    it('it should return the index view', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;

          done();
        });
    })
  });

  describe('/GET api/whoami', () => {
    it('it should return a reasonable defaults', (done) => {
      chai.request(server)
        .get('/api/whoami')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('ipaddress');
          res.body.should.have.property('language');
          res.body.should.have.property('os');

          res.body.ipaddress.should.not.be.null;
          res.body.language.should.equal("en-US,en;q=0.9");
          res.body.os.should.equal("unknown");

          done();
        });
    }),

    it("it should return a User's language", (done) => {
      chai.request(server)
        .get('/api/whoami')
        .set('accept-language', 'ru-RU,ru;q=0.9')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('ipaddress');
          res.body.should.have.property('language');
          res.body.should.have.property('os');

          res.body.language.should.equal("ru-RU,ru;q=0.9");

          done();
        });
    })

    it("it should return a User's OS", (done) => {
      chai.request(server)
        .get('/api/whoami')
        .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('ipaddress');
          res.body.should.have.property('language');
          res.body.should.have.property('os');

          res.body.os.should.equal("OS X");

          done();
        });
    })

    it("it should return a IP Address, Language, and OS", (done) => {
      chai.request(server)
        .get('/api/whoami')
        .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0')
        .set('accept-language', 'ru-RU,ru;q=0.9')

        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('ipaddress');
          res.body.should.have.property('language');
          res.body.should.have.property('os');

          res.body.ipaddress.should.not.be.null;
          res.body.os.should.equal("OS X");
          res.body.language.should.equal("ru-RU,ru;q=0.9");

          done();
        });
    })

  });

});
