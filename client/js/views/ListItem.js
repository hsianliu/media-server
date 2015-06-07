var fs = require('fs');
var View = require('./View');

function ListItem(movie) {
    View.call(this);

    this.el = document.createElement('li');

    this.render(movie);
}

ListItem.prototype = Object.create(View.prototype);
ListItem.prototype.template = fs.readFileSync(__dirname + '/ListItem.html', 'utf8');

ListItem.prototype.render = function(data) {
    View.prototype.render.call(this);

    this.el.querySelector('.name').innerText = data.filename;
    this.el.querySelector('.size').innerText = data.size;
};




module.exports = ListItem;
