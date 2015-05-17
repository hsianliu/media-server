var fs = require('fs');
var View = require('./View');
var request = require('request');

function Form() {
    View.call(this);
    this.el = document.querySelector('.form');
}

Form.prototype = Object.create(View.prototype);

Form.prototype.template = fs.readFileSync(__dirname + '/Form.html', 'utf8');
Form.prototype.render = function() {
    View.prototype.render.call(this);

    var button = this.el.querySelector('button');
    button.addEventListener('click', this.buttonClicked.bind(this));
};

Form.prototype.buttonClicked = function() {
    var data = {
        name: this.el.querySelector('[name="filename"]').value,
        size: this.el.querySelector('[name="size"]').value
    };

    request.post({url: 'http://localhost:8080/movies', json: data});
};

module.exports = Form;
