var _ = require('lodash');

var pictures = [
    {key: _.uniqueId(), filename: "1.jpg", size: 100},
    {key: _.uniqueId(), filename: "2.jpg", size: 200},
    {key: _.uniqueId(), filename: "3.jpg", size: 300},
];

module.exports = {
    get: function() {
        return JSON.stringify({count: pictures.length, pictures: pictures});
    },

    post: function(picture) {
        var obj = {key: _.uniqueId(), filename: picture.name, size: picture.size};
        pictures.push(obj);
        return JSON.stringify(obj);
    },

    delete: function(key) {
        var idx = -1;
        pictures.forEach(function(pic, index) {
            if (pic.key == key) {
                idx = index;
            }
        });
        pictures.splice(idx, 1);
        return this.get();
    },

    put: function(key, obj) {
        var picture = _.find(pictures, {key: key});
        if (obj.filename) {
            picture.filename = obj.filename;
        }

        if (obj.size) {
            picture.size = obj.size;
        }
        return JSON.stringify(picture);
    }
};
