// set node env to test
process.env.NODE_ENV = 'testing';

const assert = require('chai').assert;

const data = 'This is a test string';

describe('Initial Test', function() {
  describe('#string', function() {
    it('should return a typeof sting', function() {
      assert.typeOf(data, 'string');
    });
  });
});
