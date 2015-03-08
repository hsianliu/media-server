var assert = require('assert');
var movies = require('../movies');

describe('movies', function() {
    describe('get', function() {
        var getJSON;

        beforeEach(function() {
            getJSON = movies.get();

        });

        it('should return a string', function() {
            assert(typeof getJSON == 'string');
        });

        it('should return JSON', function() {
            var obj = JSON.parse(getJSON);
            assert(typeof obj == 'object');
            assert(obj.count == 3);
        });
    });
});
