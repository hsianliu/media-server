var _ = require('lodash');

var movies = [
    {key: _.uniqueId(), filename: "a.avi", size: 1000},
    {key: _.uniqueId(), filename: "b.avi", size: 2000},
    {key: _.uniqueId(), filename: "c.avi", size: 3000},
];

module.exports = {
    get: function(key) {
        if (key) {
            var movie;

            movies.forEach(function(mov) {
                if (mov.key == key) {
                    movie = mov;
                }
            });

            if (movie) {
                return movie;
            } else {
                throw new Error("movie not found: key: " + key);
            }
        } else {
            return {count: movies.length, movies: movies};
        }
    },

    post: function(movie) {
        var obj = {key: _.uniqueId(), filename: movie.name, size: movie.size};
        movies.push(obj);
        return obj;
    },

    delete: function(key) {
        _.remove(movies, {key: key});
        return this.get();
    },

    put: function(key, obj) {
        var movie = _.find(movies, {key: key});
        if (obj.filename) {
            movie.filename = obj.filename;
        }

        if (obj.size) {
            movie.size = obj.size;
        }
        return movie;
    }
};
