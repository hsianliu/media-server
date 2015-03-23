var assert = require('assert');
var movies = require('../movies');

describe('movies', function() {
    describe('get', function() {
        var obj;

        beforeEach(function() {
            obj = movies.get();
        });

        it('should return object', function() {
            assert(typeof obj == 'object');
            assert(obj.count == 3);
        });
    });
});
