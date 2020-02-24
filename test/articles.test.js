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
          done();
        });
    });
  });
});
