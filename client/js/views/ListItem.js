var fs = require('fs');
var request = require('request');
var View = require('./View');
var events = require('../libs/events');

function ListItem(movie) {
    View.call(this);

    this.el = document.createElement('li');

    this.render(movie);
}

ListItem.prototype = Object.create(View.prototype);
ListItem.prototype.template = fs.readFileSync(__dirname + '/ListItem.html', 'utf8');

ListItem.prototype.render = function(data) {
    View.prototype.render.call(this);

    this.key = data.key;
    this.el.querySelector('.name').innerText = data.filename;
    this.el.querySelector('.size').innerText = data.size;

    this.deleteButton = this.el.querySelector('.delete');
    this.editButton = this.el.querySelector('.edit');

    this.deleteButton.addEventListener('click', this.delete.bind(this));
    this.editButton.addEventListener('click', this.edit.bind(this));
};

ListItem.prototype.delete = function() {
    request.del({url: 'http://localhost:8080/movies/' + this.key}, function(err, res, data) {
        events.trigger('refresh-list');
    }.bind(this));
};

ListItem.prototype.edit = function() {
    events.trigger('edit-item', this.key);
};

module.exports = ListItem;
