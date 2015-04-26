var fs = require('fs');
var View = require('./View');

function List(arg1, arg2, arg3) {
    View.call(this);

    console.log(this.bananas);

    this.el = document.querySelector('.list');
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

module.exports = List;
