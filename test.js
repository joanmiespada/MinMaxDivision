var assert = require('assert');
var main = require('./main.js');

function checkMemory()
{
    const used = process.memoryUsage();
    for (let key in used) {
      console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
}

describe('MinMax', function() {
  describe('test1', function() {
    
    it('should return 4 when the values are (3,4,[1,2,3,4])', function() {
      console.time('test');  
      assert.equal(main.MinMax(3,4,[1,2,3,4]) , 4);
      console.timeEnd('test');
      checkMemory()
    });

    it('should return 6 when the values are (3,5,[2,1,5,1,2,2,2])', function() {
      console.time('test');  
      assert.equal(main.MinMax(3,5,[2,1,5,1,2,2,2]) , 6);
      console.timeEnd('test');
      checkMemory()
    });
    it('should return 0 when the values are (1,0,[0])', function() {
        console.time('test'); 
        assert.equal(main.MinMax(1,0,[0]) , 0);
        console.timeEnd('test');
        checkMemory();
    });
    it('should return 0 when the values are (10000,10000,[0,10000,0])', function() {
        console.time('test'); 
        assert.equal(main.MinMax(10000,10000,[0,10000,0]) , 0);
        console.timeEnd('test');
        checkMemory();
    });
    it('maximal minmal values (100000,10000,[0])', function() {
          console.time('test'); 
          assert.equal(main.MinMax(25000,10000,[0]) , 0);
          console.timeEnd('test');
          checkMemory();
    });
    it('limits (10000,10000,[0,10000,0])', function() {
          console.time('test'); 
          assert.equal(main.MinMax(100000,10000,[0,10000,0]) , 0);
          console.timeEnd('test');
          checkMemory();
    });
  });
});
//https://app.codility.com/demo/results/trainingKQV292-5WD/