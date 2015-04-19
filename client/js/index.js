var request = require('request');
var div = document.querySelector('.list');

function reqListener () {
    console.log(this.responseText);
    var data = JSON.parse(this.responseText);
    console.log("data: ", data);

    var html = '<ul>';
    data.movies.forEach(function (movie){
        html += '<li>' + movie.filename + '</li>';
    });

    html += '</ul>';
    div.innerHTML = html;
}

// var oReq = new XMLHttpRequest();
// oReq.onload = reqListener;
// oReq.open("get", "movies", true);
// oReq.send();

request.get({url: 'http://localhost:8080/movies'}, function(err, res, data) {
    data = JSON.parse(data);
    console.log("data: ", data);

    var html = '<ul>';
    data.movies.forEach(function (movie){
        html += '<li>' + movie.filename + '</li>';
    });

    html += '</ul>';
    div.innerHTML = html;
});

var button = document.querySelector('button');
button.addEventListener('click', function() {
    var data = {
        name: document.querySelector('[name="filename"]').value,
        size: document.querySelector('[name="size"]').value
    };

    request.post({url: 'http://localhost:8080/movies', json: data});
});
