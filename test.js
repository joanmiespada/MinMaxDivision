var assert = require('assert');
var main = require('./main.js');

describe('MinMax', function() {
  describe('test1', function() {
    it('should return 6 when the values are (3,5,[2,1,5,1,2,2,2])', function() {
        assert.equal(main.MinMax(3,5,[2,1,5,1,2,2,2]) , 6);
    });
  });
});