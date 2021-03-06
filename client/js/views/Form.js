var fs = require('fs');
var View = require('./View');
var request = require('request');
var events = require('../libs/events');

function Form() {
    View.call(this);
    this.el.classList.add('form');
    events.on('edit-item', this.getItem.bind(this));
    events.on('new-item', this.newItem.bind(this));
    this.render();
}

Form.prototype = Object.create(View.prototype);

Form.prototype.template = fs.readFileSync(__dirname + '/Form.html', 'utf8');
Form.prototype.render = function(item) {
    item = item || {};

    if (!this.built) {
        View.prototype.render.call(this);

        var button = this.el.querySelector('button');
        button.addEventListener('click', this.buttonClicked.bind(this));
        this.built = true;
    }

    this.el.querySelector('[name="filename"]').value = item.filename || '';
    this.el.querySelector('[name="size"]').value = item.size || '';
    this.item = item;
};

Form.prototype.buttonClicked = function() {
    var data = {
        name: this.el.querySelector('[name="filename"]').value,
        size: this.el.querySelector('[name="size"]').value
    };

    if (this.item.key) {
        request.put({url: 'http://localhost:8080/movies/' + this.item.key, json: data}, function() {
            events.trigger('refresh-list');

            window.location.hash = '';
        });
    } else {
        request.post({url: 'http://localhost:8080/movies', json: data}, function() {
            events.trigger('refresh-list');

            window.location.hash = '';
        });
    }
};

Form.prototype.getItem = function(key) {
    request.get({url: 'http://localhost:8080/movies/' + key}, function(err, res, body) {
        var item = JSON.parse(body);
        this.render(item);
    }.bind(this));
};

Form.prototype.newItem = function() {
    this.render();
};

module.exports = Form;
