var fs = require('fs');
var request = require('request');
var View = require('./View');
var events = require('../libs/events');

function List(arg1, arg2, arg3) {
    View.call(this);

    this.el = document.querySelector('.list');

    events.on('refresh-list', this.refresh.bind(this));

    this.refresh();
}


List.prototype = Object.create(View.prototype);

List.prototype.template = fs.readFileSync(__dirname + '/List.html', 'utf8');

List.prototype.render = function(data) {
    View.prototype.render.call(this);

    var ul = this.el.querySelector('ul');

    var items = '';
    data.movies.forEach(function (movie){
        items += '<li>' + movie.filename + '</li>';
    });

    ul.innerHTML = items;
};

List.prototype.refresh = function() {
    request.get({url: 'http://localhost:8080/movies'}, function(err, res, data) {
        data = JSON.parse(data);

        this.render(data);
    }.bind(this));
};

module.exports = List;
