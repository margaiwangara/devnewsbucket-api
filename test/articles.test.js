// set env vars
process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const Article = require('../models/article');
const server = require('../index');

// middleware
chai.use(chaiHttp);

describe('Articles', () => {
  // clear db
  beforeEach(function(done) {
    Article.deleteMany({}, function(err) {
      if (err) return done(err);
      done();
    });
  });

  // get all, must be equal to 0
  describe('#GET /articles', function() {
    it('should get all article documents from collection', function(done) {
      chai
        .request(server)
        .get('/api/articles')
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.have.all.keys(
            'success',
            'count',
            'pagination',
            'data',
          );
          res.body.data.should.be.an('array');
          res.body.data.should.have.lengthOf(0);
          res.body.count.should.be.eql(0);
          done();
        });
    });
  });

  // create articles
  describe('#POST /articles', function() {
    it('should store articles into db from scrapped data', function(done) {
      chai
        .request(server)
        .post('/api/articles')
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(201);
          res.body.should.be.an('array');
          done();
        });
    });
  });
});
