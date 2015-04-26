var List = require('./views/List');
var request = require('request');

var list = new List();
request.get({url: 'http://localhost:8080/movies'}, function(err, res, data) {
    data = JSON.parse(data);
    list.render(data);
    console.log("data: ", data);


});

var button = document.querySelector('button');
button.addEventListener('click', function() {
    var data = {
        name: document.querySelector('[name="filename"]').value,
        size: document.querySelector('[name="size"]').value
    };

    request.post({url: 'http://localhost:8080/movies', json: data});
});
