var List = require('./views/List');
var Form = require('./views/Form');
var request = require('request');

var list = new List();
request.get({url: 'http://localhost:8080/movies'}, function(err, res, data) {
    data = JSON.parse(data);
    list.render(data);
    console.log("data: ", data);


});

var form = new Form();
form.render();
