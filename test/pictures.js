var assert = require('assert');
var pictures = require('../pictures');

describe('pictures', function() {
    describe('get', function() {
        var obj;

        beforeEach(function() {
            obj = pictures.get();
        });

        it('should return object', function() {
            assert(typeof obj == 'object');
            assert(obj.count == 3);
        });
    });
});
